function transitionFromUpperToLower(identifier, index, wordStart) {
            return index !== wordStart && index + 1 < identifier.length && isUpperCaseLetter(identifier.charCodeAt(index)) && isLowerCaseLetter(identifier.charCodeAt(index + 1)) && every2(identifier, isUpperCaseLetter, wordStart, index);
        }