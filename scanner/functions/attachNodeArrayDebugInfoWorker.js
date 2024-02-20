function attachNodeArrayDebugInfoWorker(array) {
                        if (!("__tsDebuggerDisplay" in array)) {
                            Object.defineProperties(array, {
                                __tsDebuggerDisplay: {
                                    value(defaultValue) {
                                        defaultValue = String(defaultValue).replace(/(?:,[\s\w\d_]+:[^,]+)+\]$/, "]");
                                        return `NodeArray ${defaultValue}`;
                                    }
                                }
                            });
                        }
                    }