const { exec, copy } = require('./../providers/ssh');
const { get, set } = require('./../services/configuration');
const { createZip } = require('./../services/archive');

module.exports = {
    init() {
        const releaseOrigin = get('RELEASE_ORIGIN');

        set('RELEASE_PATH', '{{ RELEASE_ORIGIN }}/releases/{{ RELEASE_NUMBER }}');
        set('RELEASE_IN_PROGRESS', '{{ RELEASE_ORIGIN }}/release');
        set('RELEASE_CURRENT', '{{ RELEASE_ORIGIN }}/current');

        return exec(`mkdir -p ${releaseOrigin}/releases`);
    },

    prepareRelease() {
        const releasePath = get('RELEASE_PATH');
        const releaseInProgress = get('RELEASE_IN_PROGRESS');

        return exec(`mkdir ${releasePath}`)
            .then(() => exec(`rm -rf ${releaseInProgress}`))
            .then(() => exec(`ln -s ${releasePath} ${releaseInProgress}`));
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
