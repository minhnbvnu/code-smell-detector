function getAccessibleFileSystemEntries(path) {
                            perfLogger.logEvent("ReadDir: " + (path || "."));
                            try {
                                const entries = _fs.readdirSync(path || ".", { withFileTypes: true });
                                const files = [];
                                const directories = [];
                                for (const dirent of entries) {
                                    const entry = typeof dirent === "string" ? dirent : dirent.name;
                                    if (entry === "." || entry === "..") {
                                        continue;
                                    }
                                    let stat;
                                    if (typeof dirent === "string" || dirent.isSymbolicLink()) {
                                        const name = combinePaths(path, entry);
                                        try {
                                            stat = statSync(name);
                                            if (!stat) {
                                                continue;
                                            }
                                        }
                                        catch (e) {
                                            continue;
                                        }
                                    }
                                    else {
                                        stat = dirent;
                                    }
                                    if (stat.isFile()) {
                                        files.push(entry);
                                    }
                                    else if (stat.isDirectory()) {
                                        directories.push(entry);
                                    }
                                }
                                files.sort();
                                directories.sort();
                                return { files, directories };
                            }
                            catch (e) {
                                return emptyFileSystemEntries;
                            }
                        }