const exec = require('child_process').exec;

module.exports = {
    createZip(folder, path) {
        return new Promise((resolve, reject) => {
            exec(`cd ${folder} && zip -r ${path} . -x node_modules\\* -x .git\\* -x .idea\\*`, (err, stdout) => {
                if (!!err) {
                    return reject(err);
                }

                return resolve(stdout.trim());
            });
        });
    }
};
