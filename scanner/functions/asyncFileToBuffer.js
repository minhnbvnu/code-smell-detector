function asyncFileToBuffer(filepath, callback) {
        // open the file in read only mode
        fs.open(filepath, 'r', function (err, descriptor) {
            if (err) {
                return callback(err);
            }
            var size = fs.fstatSync(descriptor).size;
            if (size <= 0) {
                return callback(new Error("File size is not greater than 0 —— " + filepath));
            }
            var bufferSize = Math.min(size, MaxBufferSize);
            var buffer = new Buffer(bufferSize);
            // read first buffer block from the file, asynchronously
            fs.read(descriptor, buffer, 0, bufferSize, 0, function (err) {
                if (err) {
                    return callback(err);
                }
                // close the file, we are done
                fs.close(descriptor, function (err) {
                    callback(err, buffer);
                });
            });
        });
    }