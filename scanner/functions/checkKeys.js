function checkKeys(dict) {
                        Object.keys(dict).forEach(function (key) {
                            check$1.command(KEY_NAMES.indexOf(key) >= 0, 'unknown parameter "' + key + '"', env.commandStr);
                        });
                    }