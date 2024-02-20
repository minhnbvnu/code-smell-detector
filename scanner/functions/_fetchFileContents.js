function _fetchFileContents (filePath) {
    if (!fs.existsSync(filePath)) return 'File Not Found';

    return fs.readFileSync(filePath, 'utf-8');
}