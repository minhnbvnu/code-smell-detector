function quotePropertyName(sourceFile, preferences, name) {
            if (/^\d+$/.test(name)) {
                return name;
            }
            return quote(sourceFile, preferences, name);
        }