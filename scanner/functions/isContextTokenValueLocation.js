function isContextTokenValueLocation(contextToken2) {
                return contextToken2 && (contextToken2.kind === 112 /* TypeOfKeyword */ && (contextToken2.parent.kind === 183 /* TypeQuery */ || isTypeOfExpression(contextToken2.parent)) || contextToken2.kind === 129 /* AssertsKeyword */ && contextToken2.parent.kind === 179 /* TypePredicate */);
            }