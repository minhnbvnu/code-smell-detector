function nodeWrite(path, filename, text) {
                var fs = require("fs-extra");
                var nodejs_path = require("path");
                fs.mkdirpSync(path);
                var filepath = nodejs_path.join(path, filename);
                var xmlfile = fs.openSync(filepath, "w");
                fs.writeSync(xmlfile, text, 0);
                fs.closeSync(xmlfile);
            }