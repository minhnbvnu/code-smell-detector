function getEffectiveImplementsTypeNodes(node) {
            if (isInJSFile(node)) {
                return getJSDocImplementsTags(node).map((n) => n.class);
            }
            else {
                const heritageClause = getHeritageClause(node.heritageClauses, 117 /* ImplementsKeyword */);
                return heritageClause == null ? void 0 : heritageClause.types;
            }
        }