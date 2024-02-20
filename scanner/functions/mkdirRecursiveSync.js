function mkdirRecursiveSync(path) {
                    var stats = _fs.statSync(path);
                    if(stats.isFile()) {
                        IOUtils.throwIOError("\"" + path + "\" exists but isn't a directory.", null);
                    } else {
                        if(stats.isDirectory()) {
                            return;
                        } else {
                            mkdirRecursiveSync(_path.dirname(path));
                            _fs.mkdirSync(path, 509);
                        }
                    }
                }