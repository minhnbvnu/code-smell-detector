function visitSuperKeyword(isExpressionOfCall) {
                return hierarchyFacts & 8 /* NonStaticClassElement */ && !isExpressionOfCall ? factory2.createPropertyAccessExpression(factory2.createUniqueName("_super", 16 /* Optimistic */ | 32 /* FileLevel */), "prototype") : factory2.createUniqueName("_super", 16 /* Optimistic */ | 32 /* FileLevel */);
            }