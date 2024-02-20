function filesInFolder(folder) {
                    var paths = [];
                    var files = _fs.readdirSync(folder);
                    for(var i = 0; i < files.length; i++) {
                        var stat = _fs.statSync(folder + "/" + files[i]);
                        if(options.recursive && stat.isDirectory()) {
                            paths = paths.concat(filesInFolder(folder + "/" + files[i]));
                        } else {
                            if(stat.isFile() && (!spec || files[i].match(spec))) {
                                paths.push(folder + "/" + files[i]);
                            }
                        }
                    }
                    return paths;
                }