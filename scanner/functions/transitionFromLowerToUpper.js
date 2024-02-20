function transitionFromLowerToUpper(identifier, word, index) {
            const lastIsUpper = isUpperCaseLetter(identifier.charCodeAt(index - 1));
            const currentIsUpper = isUpperCaseLetter(identifier.charCodeAt(index));
            return currentIsUpper && (!word || !lastIsUpper);
        }