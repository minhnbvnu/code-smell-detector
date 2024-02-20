function fileSystemEntryExists(path, entryKind) {
                            const originalStackTraceLimit = Error.stackTraceLimit;
                            Error.stackTraceLimit = 0;
                            try {
                                const stat = statSync(path);
                                if (!stat) {
                                    return false;
                                }
                                switch (entryKind) {
                                    case 0 /* File */:
                                        return stat.isFile();
                                    case 1 /* Directory */:
                                        return stat.isDirectory();
                                    default:
                                        return false;
                                }
                            }
                            catch (e) {
                                return false;
                            }
                            finally {
                                Error.stackTraceLimit = originalStackTraceLimit;
                            }
                        }