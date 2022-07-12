const { exec } = require('./../providers/ssh');
const { get } = require('./../services/configuration');

module.exports = {
    dockerComposeUp(cwd = get('RELEASE_ORIGIN')) {
        return exec('docker-compose up -d', cwd);
    },

    dockerComposeStop(cwd = get('RELEASE_ORIGIN')) {
        return exec('docker-compose stop', cwd);
    },

    dockerCompose(cmd, cwd = get('RELEASE_ORIGIN')) {
        return exec(`docker-compose ${cmd}`, cwd);
    },

    dockerComposeUpAll() {
        const releaseOrigin = get('RELEASE_ORIGIN');

        return exec(`docker-compose $(for file in ${releaseOrigin}/../*/docker-compose*.yaml; do echo -f "$file"; done) up -d`);
    },
};
