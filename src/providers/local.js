const exec = require('child_process').exec;
const { get } = require('./../services/configuration');

module.exports = {
    exec(cmd, cwd = '~') {
        return new Promise((resolve, reject) => {
            const debug = get('DEBUG', true);

            if (debug) {
                console.log(cmd.trim());
            }

            exec(`cd ${cwd} ; ${cmd}`, (err, stdout) => {
                if (!!err) {
                    return reject(err);
                }

                if (debug) {
                    console.log(stdout.trim());
                }

                return resolve(stdout.trim());
            });
        });
    },

    copy(file, path, options = '') {
        return new Promise((resolve, reject) => {
            const debug = get('DEBUG', true);

            if (debug) {
                console.log(`coping ${file} at ${path}`);
            }

            exec(`cp ${options} ${file} ${path}`, (err, stdout) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(stdout.trim());
            });
        });
    },
};
