const { exec } = require('./../providers/ssh');
const { get } = require('./../services/configuration');

module.exports = {
    npmInstall(env = null) {
        const releasePath = get('RELEASE_PATH');
        env = env || get('NODE_ENV', 'production');

        return exec(`NODE_ENV=${env} npm install`, releasePath);
    },
};
