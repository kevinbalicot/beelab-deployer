const { get, set } = require('./src/services/configuration');
const { init, prepareRelease, release, cleanRelease, copySources } = require('./src/tasks/deployer');
const { gitClone } = require('./src/tasks/git');
const { npmInstall } = require('./src/tasks/npm');
const { make } = require('./src/tasks/makefile');
const { dockerComposeUp } = require('./src/tasks/docker');

const now = new Date();

set('SSH_HOST', '141.94.251.183');
set('SSH_USER', 'ubuntu');
set('SSH_PORT', 22);
set('RELEASE_ORIGIN', '~/docker-sources');
set('RELEASE_NUMBER', `${('0' + now.getDate()).slice(-2)}${('0' + (now.getMonth() + 1)).slice(-2)}${now.getFullYear()}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`);
set('GIT_REPOSITORY', 'git@git.beelab.tk:beelab/post-it.git');

const task = async function() {
    await init();
    await prepareRelease();
    await copySources('/home/kevin/private/beelab/bootstrap');
    //await gitClone();
    await npmInstall('dev');
    await make('build');
    //await dockerComposeUp();
    await release();
    await cleanRelease();
};

task();
