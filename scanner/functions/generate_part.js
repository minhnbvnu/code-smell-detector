function generate_part(name, part, boundary, callback) {
        var return_part = '--' + boundary + '\r\n';
        return_part += 'Content-Disposition: form-data; name="' + name + '"';
        function append(data, filename) {
            if (data) {
                var binary = part.content_type.indexOf('text') == -1;
                return_part += '; filename="' + encodeURIComponent(filename) + '"\r\n';
                if (binary)
                    return_part += 'Content-Transfer-Encoding: binary\r\n';
                return_part += 'Content-Type: ' + part.content_type + '\r\n\r\n';
                return_part += binary ? data.toString('binary') : data.toString('utf8');
            }
            callback(null, return_part + '\r\n');
        }
        ;
        if ((part.file || part.buffer) && part.content_type) {
            var filename = part.filename ? part.filename : part.file ? basename(part.file) : name;
            if (part.buffer)
                return append(part.buffer, filename);
            readFile(part.file, function (err, data) {
                if (err)
                    return callback(err);
                append(data, filename);
            });
        }
        else {
            if (typeof part.value == 'object')
                return callback(new Error('Object received for ' + name + ', expected string.'));
            if (part.content_type) {
                return_part += '\r\n';
                return_part += 'Content-Type: ' + part.content_type;
            }
            return_part += '\r\n\r\n';
            return_part += Buffer.from(String(part.value), 'utf8').toString('binary');
            append();
        }
    }