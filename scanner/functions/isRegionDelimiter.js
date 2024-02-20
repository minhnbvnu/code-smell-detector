function isRegionDelimiter(lineText) {
            lineText = trimStringStart(lineText);
            if (!startsWith(lineText, "//")) {
                return null;
            }
            lineText = trimString(lineText.slice(2));
            return regionDelimiterRegExp.exec(lineText);
        }