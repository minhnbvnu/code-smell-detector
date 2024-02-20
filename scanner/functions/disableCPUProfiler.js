function disableCPUProfiler(cb) {
                            if (activeSession && activeSession !== "stopping") {
                                const s = activeSession;
                                activeSession.post("Profiler.stop", (err, { profile }) => {
                                    var _a2;
                                    if (!err) {
                                        try {
                                            if ((_a2 = statSync(profilePath)) == null ? void 0 : _a2.isDirectory()) {
                                                profilePath = _path.join(profilePath, `${( /* @__PURE__ */new Date()).toISOString().replace(/:/g, "-")}+P${process.pid}.cpuprofile`);
                                            }
                                        }
                                        catch (e) {
                                        }
                                        try {
                                            _fs.mkdirSync(_path.dirname(profilePath), { recursive: true });
                                        }
                                        catch (e) {
                                        }
                                        _fs.writeFileSync(profilePath, JSON.stringify(cleanupPaths(profile)));
                                    }
                                    activeSession = void 0;
                                    s.disconnect();
                                    cb();
                                });
                                activeSession = "stopping";
                                return true;
                            }
                            else {
                                cb();
                                return false;
                            }
                        }