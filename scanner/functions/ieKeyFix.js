function ieKeyFix(key) {
                return key.replace(forbiddenCharsRegex, "___");
            }