const { exec } = require('./../providers/ssh');
const { get } = require("./../services/configuration");

module.exports = {
    make(cmd) {
        const releasePath = get('RELEASE_PATH');

        return exec(`make ${cmd}`, releasePath);
    },
};
