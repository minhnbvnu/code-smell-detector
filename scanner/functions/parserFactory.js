function parserFactory(name, fn) {
        function parser() {
            var chunks = [], stream = new Transform({ objectMode: true });
            // Buffer all our data
            stream._transform = function (chunk, encoding, done) {
                chunks.push(chunk);
                done();
            };
            // And call the parser when all is there.
            stream._flush = function (done) {
                var self = this, data = Buffer.concat(chunks);
                try {
                    fn(data, function (err, result) {
                        if (err)
                            throw err;
                        self.push(result);
                    });
                }
                catch (err) {
                    self.push(data); // just pass the original data
                }
                finally {
                    done();
                }
            };
            return stream;
        }
        return { fn: parser, name: name };
    }