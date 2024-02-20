function getInterfaceBaseTypeNodes(node) {
            const heritageClause = getHeritageClause(node.heritageClauses, 94 /* ExtendsKeyword */);
            return heritageClause ? heritageClause.types : void 0;
        }