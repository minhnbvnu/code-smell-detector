function enableCPUProfiler(path, cb) {
                            if (activeSession) {
                                cb();
                                return false;
                            }
                            const inspector = require("inspector");
                            if (!inspector || !inspector.Session) {
                                cb();
                                return false;
                            }
                            const session = new inspector.Session();
                            session.connect();
                            session.post("Profiler.enable", () => {
                                session.post("Profiler.start", () => {
                                    activeSession = session;
                                    profilePath = path;
                                    cb();
                                });
                            });
                            return true;
                        }