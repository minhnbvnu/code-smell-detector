function getModifiedTime3(path) {
                            var _a2;
                            const originalStackTraceLimit = Error.stackTraceLimit;
                            Error.stackTraceLimit = 0;
                            try {
                                return (_a2 = statSync(path)) == null ? void 0 : _a2.mtime;
                            }
                            catch (e) {
                                return void 0;
                            }
                            finally {
                                Error.stackTraceLimit = originalStackTraceLimit;
                            }
                        }