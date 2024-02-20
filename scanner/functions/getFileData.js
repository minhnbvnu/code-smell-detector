function getFileData(fulfill, reject) {
                (function tryPathIndex(i) {
                    if (i < paths.length) {
                        (function tryPrefix(j) {
                            if (j < prefixes.length) {
                                isNodeModule = false;
                                fullFilename = fileParts.rawPath + prefixes[j] + fileParts.filename;
                                if (paths[i]) {
                                    fullFilename = path_1.default.join(paths[i], fullFilename);
                                }
                                if (!explicit && paths[i] === '.') {
                                    try {
                                        fullFilename = require.resolve(fullFilename);
                                        isNodeModule = true;
                                    }
                                    catch (e) {
                                        filenamesTried.push(npmPrefix + fullFilename);
                                        tryWithExtension();
                                    }
                                }
                                else {
                                    tryWithExtension();
                                }
                                function tryWithExtension() {
                                    var extFilename = options.ext ? self.tryAppendExtension(fullFilename, options.ext) : fullFilename;
                                    if (extFilename !== fullFilename && !explicit && paths[i] === '.') {
                                        try {
                                            fullFilename = require.resolve(extFilename);
                                            isNodeModule = true;
                                        }
                                        catch (e) {
                                            filenamesTried.push(npmPrefix + extFilename);
                                            fullFilename = extFilename;
                                        }
                                    }
                                    else {
                                        fullFilename = extFilename;
                                    }
                                }
                                var readFileArgs = [fullFilename];
                                if (!options.rawBuffer) {
                                    readFileArgs.push('utf-8');
                                }
                                if (options.syncImport) {
                                    try {
                                        var data = fs_1.default.readFileSync.apply(this, readFileArgs);
                                        fulfill({ contents: data, filename: fullFilename });
                                    }
                                    catch (e) {
                                        filenamesTried.push(isNodeModule ? npmPrefix + fullFilename : fullFilename);
                                        return tryPrefix(j + 1);
                                    }
                                }
                                else {
                                    readFileArgs.push(function (e, data) {
                                        if (e) {
                                            filenamesTried.push(isNodeModule ? npmPrefix + fullFilename : fullFilename);
                                            return tryPrefix(j + 1);
                                        }
                                        fulfill({ contents: data, filename: fullFilename });
                                    });
                                    fs_1.default.readFile.apply(this, readFileArgs);
                                }
                            }
                            else {
                                tryPathIndex(i + 1);
                            }
                        })(0);
                    }
                    else {
                        reject({ type: 'File', message: "'" + filename + "' wasn't found. Tried - " + filenamesTried.join(',') });
                    }
                }(0));
            }