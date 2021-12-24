const exec = require('child_process').exec;
const { get } = require('./../services/configuration');

module.exports = {
    exec(cmd) {
        return new Promise((resolve, reject) => {
            const debug = get('DEBUG', true);
            const user = get('SSH_USER');
            const host = get('SSH_HOST');
            const port = get('SSH_PORT', 22);
            const key = get('SSH_KEY', null);

            if (debug) {
                console.log(cmd.trim());
            }

            exec(`ssh ${user}@${host}${key ? '-i ' . key : ' '}-p ${port} "${cmd}"`, (err, stdout) => {
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
            const user = get('SSH_USER');
            const host = get('SSH_HOST');
            const port = get('SSH_PORT', 22);
            const key = get('SSH_KEY', null);

            //console.log(`coping ${file} at ${this.ip}:${path}`.yellow);
            exec(`scp${key ? '-i ' . key : ' '}-P ${port} ${options} ${file} ${user}@${host}:${path}`, (err, stdout) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(stdout.trim());
            });
        });
    },
};
