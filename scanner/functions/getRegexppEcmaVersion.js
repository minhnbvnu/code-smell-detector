function getRegexppEcmaVersion(ecmaVersion) {
                if (ecmaVersion <= 5) {
                    return 5;
                }
                return Math.min(ecmaVersion, REGEXPP_LATEST_ECMA_VERSION);
            }