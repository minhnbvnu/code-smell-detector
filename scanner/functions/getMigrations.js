function getMigrations(){
    return new Promise((resolve, reject) => {
        glob(require("path").join(__dirname, './versions/*.js'), (err, files) => {
            let migrationVersions = files.reduce((acc, file) => {
                console.log(file);
                let version = file.split("/").pop().slice(0, -3);
                 acc[version] = require(file);
                 return acc;
            },{});
            resolve(migrationVersions);
        })
    })
}