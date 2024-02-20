function scanToken(text, languageVersion) {
        if (cachedScanner === undefined) {
            // cache scanner
            cachedScanner = ts.createScanner(languageVersion, false, undefined, text);
        }
        else {
            cachedScanner.setScriptTarget(languageVersion);
            cachedScanner.setText(text);
        }
        cachedScanner.scan();
        return cachedScanner;
    }