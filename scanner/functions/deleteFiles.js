function deleteFiles(folderPath) {
    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
        const filePath = path.join(folderPath, file);

        if (filePath !== dataDir) {
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            } else {
                deleteFiles(filePath);
                fs.rmdirSync(filePath);
            }
        }
    });
}