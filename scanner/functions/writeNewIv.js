function writeNewIv() {
    if (crypto === null) {
        crypto = require("crypto");
    }
    const iv = crypto.randomBytes(16).toString("hex").slice(0, 16);
    fs.writeFileSync(filehelper.newivpath, iv, (error) => {
        if (error) {
            console.error("could not write new iv");
        }
    });

    // delete old iv file
    if (fs.existsSync(ivpath)) {
        fs.unlink(ivpath, (err) => {
            if (!err){
                console.log(`${ivpath} was deleted`);
            } else {
                console.error(`Error: ${err}.`);
            }            
        });
    }
}