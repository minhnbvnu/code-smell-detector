function cryptoAvailable() {
    try {
        if (crypto === null) {
            crypto = require("crypto");

            if (fs.existsSync(ivpath) && readFromFile(ivpath) === "") {
                writeNewIv();
            }
        }
    } catch (error) {
        return false;
    }
    return true;
}