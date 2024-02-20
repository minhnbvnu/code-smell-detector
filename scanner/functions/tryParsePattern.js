function tryParsePattern(pattern) {
            const indexOfStar = pattern.indexOf("*");
            if (indexOfStar === -1) {
                return pattern;
            }
            return pattern.indexOf("*", indexOfStar + 1) !== -1 ? void 0 : {
                prefix: pattern.substr(0, indexOfStar),
                suffix: pattern.substr(indexOfStar + 1)
            };
        }