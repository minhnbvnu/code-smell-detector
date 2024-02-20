function syncFileToBuffer(filepath) {
        // read from the file, synchronously
        var descriptor = fs.openSync(filepath, 'r');
        var size = fs.fstatSync(descriptor).size;
        var bufferSize = Math.min(size, MaxBufferSize);
        var buffer = new Buffer(bufferSize);
        fs.readSync(descriptor, buffer, 0, bufferSize, 0);
        fs.closeSync(descriptor);
        return buffer;
    }