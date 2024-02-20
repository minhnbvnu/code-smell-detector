function relativePathToPythonImportPath(relativePath) {

    let tokens = relativePath.split(pathSep);
    const firstToken = tokens[0];
    let sawFolderToken = false;

    if (tokens.length <= 0) { return '.'; }

    let result = '';
    if (firstToken === '.') {
        tokens = tokens.slice(1);
        result = '';
    } else if (firstToken === '..') {
        tokens = tokens.slice(1);
        result = '.';
    }

    tokens.forEach(function(token) {
        if (token === '.') {
            return;
        } else if (token === '..') {
            result += '.';
        } else {
            result += '.' + token;
            sawFolderToken = true;
        }

    });

    if (!sawFolderToken) { result += '.'; }

    return result;
}