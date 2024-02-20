function handleGZIPResponse (response) {
          if (/^(deflate|gzip)$/.test(response.headers['content-encoding'])) {
            var unzip = zlib.createUnzip()
            var stream = new Stream()
            var _on = response.on
            var decoder

            // Keeping node happy
            stream.req = response.req

            // Make sure we emit prior to processing
            unzip.on('error', function (error) {
              // Catch the parser error when there is no content
              if (error.errno === zlib.Z_BUF_ERROR || error.errno === zlib.Z_DATA_ERROR) {
                stream.emit('end')
                return
              }

              stream.emit('error', error)
            })

            // Start the processing
            response.pipe(unzip)

            // Ensure encoding is captured
            response.setEncoding = function (type) {
              decoder = new StringDecoder(type)
            }

            // Capture decompression and decode with captured encoding
            unzip.on('data', function (buffer) {
              if (!decoder) return stream.emit('data', buffer)
              var string = decoder.write(buffer)
              if (string.length) stream.emit('data', string)
            })

            // Emit yoself
            unzip.on('end', function () {
              stream.emit('end')
            })

            response.on = function (type, next) {
              if (type === 'data' || type === 'end') {
                stream.on(type, next)
              } else if (type === 'error') {
                _on.call(response, type, next)
              } else {
                _on.call(response, type, next)
              }
            }
          }
        }