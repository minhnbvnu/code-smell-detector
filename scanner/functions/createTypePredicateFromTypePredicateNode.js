function createTypePredicateFromTypePredicateNode(node, signature) {
                const parameterName = node.parameterName;
                const type = node.type && getTypeFromTypeNode(node.type);
                return parameterName.kind === 194 /* ThisType */ ? createTypePredicate(node.assertsModifier ? 2 /* AssertsThis */ : 0 /* This */, 
                /*parameterName*/
                void 0, 
                /*parameterIndex*/
                void 0, type) : createTypePredicate(node.assertsModifier ? 3 /* AssertsIdentifier */ : 1 /* Identifier */, parameterName.escapedText, findIndex(signature.parameters, (p) => p.escapedName === parameterName.escapedText), type);
            }