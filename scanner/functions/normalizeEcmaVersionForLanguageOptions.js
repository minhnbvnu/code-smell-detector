function normalizeEcmaVersionForLanguageOptions(ecmaVersion) {
        switch (ecmaVersion) {
            case 3:
                return 3;
            // void 0 = no ecmaVersion specified so use the default
            case 5:
            case void 0:
                return 5;
            default:
                if (typeof ecmaVersion === "number") {
                    return ecmaVersion >= 2015 ? ecmaVersion : ecmaVersion + 2009;
                }
        }
        /*
         * We default to the latest supported ecmaVersion for everything else.
         * Remember, this is for languageOptions.ecmaVersion, which sets the version
         * that is used for a number of processes inside of ESLint. It's normally
         * safe to assume people want the latest unless otherwise specified.
         */
        return espree.latestEcmaVersion + 2009;
    }