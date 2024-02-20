function getClassExtendsHeritageElement(node) {
            const heritageClause = getHeritageClause(node.heritageClauses, 94 /* ExtendsKeyword */);
            return heritageClause && heritageClause.types.length > 0 ? heritageClause.types[0] : void 0;
        }