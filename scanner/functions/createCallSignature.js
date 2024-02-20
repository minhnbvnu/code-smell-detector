function createCallSignature(typeParameters, thisParameter, parameters, returnType, typePredicate, minArgumentCount = parameters.length, flags = 0 /* None */) {
                const decl = factory.createFunctionTypeNode(
                /*typeParameters*/
                void 0, emptyArray, factory.createKeywordTypeNode(131 /* AnyKeyword */));
                return createSignature(decl, typeParameters, thisParameter, parameters, returnType, typePredicate, minArgumentCount, flags);
            }