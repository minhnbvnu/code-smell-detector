function deleteDirectory(directory) {
    if (fs.existsSync(directory)) {
        fs.readdirSync(directory).forEach((file) => {
            const filePath = path.join(directory, file);
            if (fs.statSync(filePath).isDirectory()) {
                deleteDirectory(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        });
        fs.rmdirSync(directory);
    }
}