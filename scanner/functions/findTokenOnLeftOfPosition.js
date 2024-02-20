function findTokenOnLeftOfPosition(file, position) {
            const tokenAtPosition = getTokenAtPosition(file, position);
            if (isToken(tokenAtPosition) && position > tokenAtPosition.getStart(file) && position < tokenAtPosition.getEnd()) {
                return tokenAtPosition;
            }
            return findPrecedingToken(position, file);
        }