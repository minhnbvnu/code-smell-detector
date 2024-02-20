function isValidRegexForEcmaVersion(pattern, flags) {
                const validator = new RegExpValidator({ ecmaVersion: regexppEcmaVersion });
                try {
                    validator.validatePattern(pattern, 0, pattern.length, flags ? flags.includes("u") : false);
                    if (flags) {
                        validator.validateFlags(flags);
                    }
                    return true;
                }
                catch {
                    return false;
                }
            }