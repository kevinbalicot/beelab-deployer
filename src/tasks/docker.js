const { exec } = require('./../providers/ssh');
const { get } = require('./../services/configuration');

module.exports = {
    dockerComposeBuild(serviceName = '', cwd = get('RELEASE_PATH')) {
        const dockerComposeBinary = get('DOCKER_COMPOSE_BIN', 'docker compose');

        return exec(`${dockerComposeBinary} build --no-cache --force-rm ${serviceName}`, cwd);
    },

    dockerComposeUp(serviceName = '', cwd = get('RELEASE_PATH')) {
        const dockerComposeBinary = get('DOCKER_COMPOSE_BIN', 'docker compose');

        return exec(`${dockerComposeBinary} up --force-recreate -d ${serviceName}`, cwd);
    },

    dockerComposeStop(serviceName = '', cwd = get('RELEASE_PATH')) {
        const dockerComposeBinary = get('DOCKER_COMPOSE_BIN', 'docker compose');

        return exec(`${dockerComposeBinary} stop ${serviceName}`, cwd);
    },

    dockerCompose(cmd, cwd = get('RELEASE_PATH')) {
        const dockerComposeBinary = get('DOCKER_COMPOSE_BIN', 'docker compose');

        return exec(`${dockerComposeBinary} ${cmd}`, cwd);
    },

    dockerComposeUpAll() {
        const releaseOrigin = get('RELEASE_ORIGIN');
        const dockerComposeBinary = get('DOCKER_COMPOSE_BIN', 'docker compose');

        return exec(`${dockerComposeBinary} $(for file in ${releaseOrigin}/../*/docker-compose*.yaml; do echo -f "$file"; done) up -d`);
    },
};
