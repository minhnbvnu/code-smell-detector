function getFileExtension(filename) {
    return filename.slice((Math.max(0, filename.lastIndexOf('.')) || Infinity) + 1);
}