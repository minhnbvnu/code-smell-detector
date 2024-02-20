function serverWriteFile(webpath, encoding, contents, callback, errorCallback) {
    console.assert(encoding === 'utf8' || encoding === 'binary');
    console.assert(contents !== undefined);
    console.assert(! /^http[s]:\/\//.test(webpath), 'serverWriteFile() expects a local webpath, not a URL');
    console.assert(webpath[1] !== ':', 'serverWriteFile() on Windows must have a / at the front of absolute paths, not a raw drive letter.')
    
    if (typeof contents !== 'string') {
        console.assert(contents.byteLength !== undefined && encoding === 'binary');
        
        // Contents are an arraybuffer. base64 encode to a string.
        // JavaScript requires us to pack into a string and then
        // base64 encode that string to another string.
        const len = contents.byteLength;
        const view = new Uint8Array(contents);
        const array = new Array(len);
        for (let i = 0; i < len; ++i) {
            array[i] = String.fromCharCode(view[i]);
        }
        contents = window.btoa(array.join(''));
    }

    postToServer({
        command: 'write_file',
        url: webpath,
        encoding: encoding,
        contents: contents
    }, callback, errorCallback);

    if (webpath.endsWith('.pyxl')) {
        updateTodoList();
    }
}