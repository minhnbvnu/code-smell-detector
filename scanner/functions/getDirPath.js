function getDirPath(path) {
    // if path is a file (has ext) remove it
    if (path.charAt(path.length - 4) === '.' || path.charAt(path.length - 5) === '.') {
        return _.initial(path.split('/')).join('/');
    }
    return path;
}