function isOptionalParameter(parameterDeclaration) {
                if (isRestParameter(parameterDeclaration)) {
                    const type = checker.getTypeAtLocation(parameterDeclaration);
                    return !checker.isTupleType(type);
                }
                return checker.isOptionalParameter(parameterDeclaration);
            }