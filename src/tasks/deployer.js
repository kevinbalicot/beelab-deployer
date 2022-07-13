const { exec, copy } = require('./../providers/ssh');
const { get, set } = require('./../services/configuration');
const { createZip } = require('./../services/archive');

module.exports = {
    init() {
        const releaseOrigin = get('RELEASE_ORIGIN');

        set('RELEASE_PATH', '{{ RELEASE_ORIGIN }}/releases/{{ RELEASE_NUMBER }}');
        set('RELEASE_IN_PROGRESS', '{{ RELEASE_ORIGIN }}/release');
        set('RELEASE_CURRENT', '{{ RELEASE_ORIGIN }}/current');
        set('RELEASE_SHARED_FOLDER_PATH', '{{ RELEASE_ORIGIN }}/shared');

        return exec(`mkdir -p ${releaseOrigin}/releases ${releaseOrigin}/shared`);
    },

    prepareRelease() {
        const releasePath = get('RELEASE_PATH');
        const releaseInProgress = get('RELEASE_IN_PROGRESS');

        return exec(`mkdir ${releasePath}`)
            .then(() => exec(`rm -rf ${releaseInProgress}`))
            .then(() => exec(`ln -s ${releasePath} ${releaseInProgress}`));
    },

    prepareShared() {
        const sharedFolders = get('RELEASE_SHARED_FOLDER', []);
        const sharedFiles = get('RELEASE_SHARED_FILES', []);
        const sharedFolderPath = get('RELEASE_SHARED_FOLDER_PATH');
        const releasePath = get('RELEASE_PATH');

        const promises = [];
        sharedFiles.forEach(file => {
            promises.push(exec(`cp ${releasePath}/${file} ${sharedFolderPath}/${file}`));
        });

        sharedFolders.forEach(folder => {
            promises.push(exec(`mkdir -p ${sharedFolderPath}/${folder}`)
                .then(() => exec(`ln -s ${sharedFolderPath}/${folder} ${releasePath}/${folder}`)));
        });

        return Promise.all(promises);
    },

    copySources(folder) {
        const releasePath = get('RELEASE_PATH');
        const archive = `/tmp/archive.zip`;
        const remoteArchive = `${releasePath}/archive.zip`;

        return createZip(folder, archive)
            .then(() => copy(archive, remoteArchive))
            .then(() => exec(`unzip ${remoteArchive} -d ${releasePath}`));
    },

    release() {
        const releasePath = get('RELEASE_PATH');
        const releaseCurrent = get('RELEASE_CURRENT');

        return exec(`ln -fns ${releasePath} ${releaseCurrent}`);
    },

    cleanRelease() {
        const releaseInProgress = get('RELEASE_IN_PROGRESS');

        return exec(`rm ${releaseInProgress}`);
    },
};
