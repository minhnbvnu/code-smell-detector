function emitJSDocTypeLiteral(lit) {
                emitList(lit, factory.createNodeArray(lit.jsDocPropertyTags), 33 /* JSDocComment */);
            }