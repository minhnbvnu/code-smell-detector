function getGlobalsForEcmaVersion(ecmaVersion) {
        switch (ecmaVersion) {
            case 3:
                return globals.es3;
            case 5:
                return globals.es5;
            default:
                if (ecmaVersion < 2015) {
                    return globals[`es${ecmaVersion + 2009}`];
                }
                return globals[`es${ecmaVersion}`];
        }
    }