function validateRegExpFlags(flags) {
                if (!flags) {
                    return null;
                }
                try {
                    validator.validateFlags(flags);
                    return null;
                }
                catch {
                    return `Invalid flags supplied to RegExp constructor '${flags}'`;
                }
            }