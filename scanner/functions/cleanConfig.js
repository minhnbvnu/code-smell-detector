function cleanConfig(confirm, path = process.cwd()) {
    if (confirm !== true) {
        return;
    }

    getFileTypes().forEach(fileName => {
        const file = `${path}/${fileName}`;
        if (!fs.existsSync(file)) {
            return false;
        }

        fs.unlinkSync(file);

        return file;
    });
}