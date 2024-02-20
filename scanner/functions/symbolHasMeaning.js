function symbolHasMeaning({ declarations }, meaning) {
            return some(declarations, (decl) => !!(getMeaningFromDeclaration(decl) & meaning));
        }