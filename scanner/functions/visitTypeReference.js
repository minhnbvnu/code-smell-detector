function visitTypeReference(type) {
                    visitType(type.target);
                    forEach(getTypeArguments(type), visitType);
                }