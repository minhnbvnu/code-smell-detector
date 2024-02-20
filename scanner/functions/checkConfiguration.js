function checkConfiguration() {
                Object.keys(flags.counts).find(key => {
                    if (checkAllAliases(key, flags.arrays)) {
                        error = Error(__('Invalid configuration: %s, opts.count excludes opts.array.', key));
                        return true;
                    }
                    else if (checkAllAliases(key, flags.nargs)) {
                        error = Error(__('Invalid configuration: %s, opts.count excludes opts.narg.', key));
                        return true;
                    }
                    return false;
                });
            }