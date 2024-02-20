function isValidWithUnicodeFlag(pattern) {
                const { ecmaVersion } = context.languageOptions;
                // ecmaVersion <= 5 doesn't support the 'u' flag
                if (ecmaVersion <= 5) {
                    return false;
                }
                const validator = new RegExpValidator({
                    ecmaVersion: Math.min(ecmaVersion, REGEXPP_LATEST_ECMA_VERSION)
                });
                try {
                    validator.validatePattern(pattern, void 0, void 0, /* uFlag = */ true);
                }
                catch {
                    return false;
                }
                return true;
            }