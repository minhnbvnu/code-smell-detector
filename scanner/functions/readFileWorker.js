function readFileWorker(fileName, _encoding) {
                            let buffer;
                            try {
                                buffer = _fs.readFileSync(fileName);
                            }
                            catch (e) {
                                return void 0;
                            }
                            let len = buffer.length;
                            if (len >= 2 && buffer[0] === 254 && buffer[1] === 255) {
                                len &= ~1;
                                for (let i = 0; i < len; i += 2) {
                                    const temp = buffer[i];
                                    buffer[i] = buffer[i + 1];
                                    buffer[i + 1] = temp;
                                }
                                return buffer.toString("utf16le", 2);
                            }
                            if (len >= 2 && buffer[0] === 255 && buffer[1] === 254) {
                                return buffer.toString("utf16le", 2);
                            }
                            if (len >= 3 && buffer[0] === 239 && buffer[1] === 187 && buffer[2] === 191) {
                                return buffer.toString("utf8", 3);
                            }
                            return buffer.toString("utf8");
                        }