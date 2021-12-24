const { exec } = require('./../providers/ssh');
const { get } = require('./../services/configuration');

module.exports = {
    gitClone() {
        const releasePath = get('RELEASE_PATH');
        const repository = get('GIT_REPOSITORY');
        const branch = get('GIT_REFERENCE', 'master');

        return exec(`cd ${releasePath} && git clone --depth 1 --branch ${branch} ${repository} .`);
    },
};
