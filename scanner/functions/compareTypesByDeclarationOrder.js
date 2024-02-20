function compareTypesByDeclarationOrder({ type: type1, declaration: declaration1 }, { type: type2, declaration: declaration2 }) {
            return compareProperties(declaration1, declaration2, "pos", compareValues) || compareStringsCaseSensitive(type1.symbol ? type1.symbol.getName() : "", type2.symbol ? type2.symbol.getName() : "") || compareValues(type1.id, type2.id);
        }