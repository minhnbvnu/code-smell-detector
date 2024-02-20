async function readAndJoinFiles (arr, i = 0, str = '') {
    const filename = arr[i];
    if (!filename) { // || i === arr.length - 1) {
        return str;
    }
    let data;
    try {
        data = await readFile(filename, 'utf8');
    } catch (err) {
        console.error('Error 11', err);
        throw err;
    }
    str += '/*jsfilename:' + filename + '*/\n\n' + data;
    return readAndJoinFiles(arr, i + 1, str);
}