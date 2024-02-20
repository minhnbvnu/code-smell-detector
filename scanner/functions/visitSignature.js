function visitSignature(signature) {
                    const typePredicate = getTypePredicateOfSignature(signature);
                    if (typePredicate) {
                        visitType(typePredicate.type);
                    }
                    forEach(signature.typeParameters, visitType);
                    for (const parameter of signature.parameters) {
                        visitSymbol(parameter);
                    }
                    visitType(getRestTypeOfSignature(signature));
                    visitType(getReturnTypeOfSignature(signature));
                }