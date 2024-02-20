function getNodeIO() {
        var _fs = require('fs');
        var _path = require('path');
        var _module = require('module');
        return {
            readFile: function (file) {
                try  {
                    var buffer = _fs.readFileSync(file);
                    switch(buffer[0]) {
                        case 254: {
                            if(buffer[1] == 255) {
                                var i = 0;
                                while((i + 1) < buffer.length) {
                                    var temp = buffer[i];
                                    buffer[i] = buffer[i + 1];
                                    buffer[i + 1] = temp;
                                    i += 2;
                                }
                                return buffer.toString("ucs2", 2);
                            }
                            break;

                        }
                        case 255: {
                            if(buffer[1] == 254) {
                                return buffer.toString("ucs2", 2);
                            }
                            break;

                        }
                        case 239: {
                            if(buffer[1] == 187) {
                                return buffer.toString("utf8", 3);
                            }

                        }
                    }
                    return buffer.toString();
                } catch (e) {
                    IOUtils.throwIOError("Error reading file \"" + file + "\".", e);
                }
            },
            writeFile: _fs.writeFileSync,
            deleteFile: function (path) {
                try  {
                    _fs.unlinkSync(path);
                } catch (e) {
                    IOUtils.throwIOError("Couldn't delete file '" + path + "'.", e);
                }
            },
            fileExists: function (path) {
                return _fs.existsSync(path);
            },
            createFile: function (path, useUTF8) {
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
                mkdirRecursiveSync(_path.dirname(path));
                try  {
                    var fd = _fs.openSync(path, 'w');
                } catch (e) {
                    IOUtils.throwIOError("Couldn't write to file '" + path + "'.", e);
                }
                return {
                    Write: function (str) {
                        _fs.writeSync(fd, str);
                    },
                    WriteLine: function (str) {
                        _fs.writeSync(fd, str + '\r\n');
                    },
                    Close: function () {
                        _fs.closeSync(fd);
                        fd = null;
                    }
                };
            },
            dir: function dir(path, spec, options) {
                options = options || {
                };
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
                return filesInFolder(path);
            },
            createDirectory: function (path) {
                try  {
                    if(!this.directoryExists(path)) {
                        _fs.mkdirSync(path);
                    }
                } catch (e) {
                    IOUtils.throwIOError("Couldn't create directory '" + path + "'.", e);
                }
            },
            directoryExists: function (path) {
                return _fs.existsSync(path) && _fs.lstatSync(path).isDirectory();
            },
            resolvePath: function (path) {
                return _path.resolve(path);
            },
            dirName: function (path) {
                return _path.dirname(path);
            },
            findFile: function (rootPath, partialFilePath) {
                var path = rootPath + "/" + partialFilePath;
                while(true) {
                    if(_fs.existsSync(path)) {
                        try  {
                            var content = this.readFile(path);
                            return {
                                content: content,
                                path: path
                            };
                        } catch (err) {
                        }
                    } else {
                        var parentPath = _path.resolve(rootPath, "..");
                        if(rootPath === parentPath) {
                            return null;
                        } else {
                            rootPath = parentPath;
                            path = _path.resolve(rootPath, partialFilePath);
                        }
                    }
                }
            },
            print: function (str) {
                process.stdout.write(str);
            },
            printLine: function (str) {
                process.stdout.write(str + '\n');
            },
            arguments: process.argv.slice(2),
            stderr: {
                Write: function (str) {
                    process.stderr.write(str);
                },
                WriteLine: function (str) {
                    process.stderr.write(str + '\n');
                },
                Close: function () {
                }
            },
            stdout: {
                Write: function (str) {
                    process.stdout.write(str);
                },
                WriteLine: function (str) {
                    process.stdout.write(str + '\n');
                },
                Close: function () {
                }
            },
            watchFile: function (filename, callback) {
                var firstRun = true;
                var processingChange = false;
                var fileChanged = function (curr, prev) {
                    if(!firstRun) {
                        if(curr.mtime < prev.mtime) {
                            return;
                        }
                        _fs.unwatchFile(filename, fileChanged);
                        if(!processingChange) {
                            processingChange = true;
                            callback(filename);
                            setTimeout(function () {
                                processingChange = false;
                            }, 100);
                        }
                    }
                    firstRun = false;
                    _fs.watchFile(filename, {
                        persistent: true,
                        interval: 500
                    }, fileChanged);
                };
                fileChanged();
                return {
                    filename: filename,
                    close: function () {
                        _fs.unwatchFile(filename, fileChanged);
                    }
                };
            },
            run: function (source, filename) {
                require.main.filename = filename;
                require.main.paths = _module._nodeModulePaths(_path.dirname(_fs.realpathSync(filename)));
                require.main._compile(source, filename);
            },
            getExecutingFilePath: function () {
                return process.mainModule.filename;
            },
            quit: process.exit
        };
    }