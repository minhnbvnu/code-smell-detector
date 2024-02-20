function isRelationalOperator(kind) {
            return kind === 29 /* LessThanToken */ || kind === 32 /* LessThanEqualsToken */ || kind === 31 /* GreaterThanToken */ || kind === 33 /* GreaterThanEqualsToken */ || kind === 102 /* InstanceOfKeyword */ || kind === 101 /* InKeyword */;
        }