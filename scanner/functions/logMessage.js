function logMessage(level, s) {
                        if (Debug2.loggingHost && shouldLog(level)) {
                            Debug2.loggingHost.log(level, s);
                        }
                    }