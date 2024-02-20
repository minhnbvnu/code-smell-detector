function getRegexFromPattern(pattern, useCaseSensitiveFileNames) {
            return new RegExp(pattern, useCaseSensitiveFileNames ? "" : "i");
        }