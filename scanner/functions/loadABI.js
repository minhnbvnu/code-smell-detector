function loadABI(abiFilePath) {
    return JSON.parse(fs.readFileSync(abiFilePath));
}