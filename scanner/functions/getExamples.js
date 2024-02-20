function getExamples() {
    return fs.readdirSync(__dirname)
        .filter(readdirItem => fs.statSync(path.join(__dirname, readdirItem)).isDirectory());
}