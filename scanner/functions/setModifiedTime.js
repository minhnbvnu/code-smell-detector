function setModifiedTime(path, time) {
                            try {
                                _fs.utimesSync(path, time, time);
                            }
                            catch (e) {
                                return;
                            }
                        }