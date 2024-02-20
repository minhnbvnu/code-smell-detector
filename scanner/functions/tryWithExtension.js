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