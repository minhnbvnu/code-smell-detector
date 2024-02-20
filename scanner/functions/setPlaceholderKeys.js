function setPlaceholderKeys(argv) {
                flags.keys.forEach((key) => {
                    if (~key.indexOf('.'))
                        return;
                    if (typeof argv[key] === 'undefined')
                        argv[key] = undefined;
                });
                return argv;
            }