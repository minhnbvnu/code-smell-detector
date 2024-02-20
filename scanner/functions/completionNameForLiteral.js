function completionNameForLiteral(sourceFile, preferences, literal) {
            return typeof literal === "object" ? pseudoBigIntToString(literal) + "n" : isString(literal) ? quote(sourceFile, preferences, literal) : JSON.stringify(literal);
        }