const { exec } = require('./../providers/ssh');
const { get } = require('./../services/configuration');

module.exports = {
    dockerComposeUp() {
        const releaseOrigin = get('RELEASE_ORIGIN');

        return exec(`docker-compose $(for file in ${releaseOrigin}/../*/docker-compose*.yaml; do echo -f "$file"; done) up -d`);
    },
};
