function entryToType(entry) {
            const reference = entry.node;
            if (getMeaningFromLocation(reference) === 2 /* Type */ || isExpressionWithTypeArgumentsInClassExtendsClause(reference.parent)) {
                return reference;
            }
            return void 0;
        }