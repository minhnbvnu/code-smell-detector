function isValidParameterDeclaration(parameterDeclaration, checker) {
            if (isRestParameter(parameterDeclaration)) {
                const type = checker.getTypeAtLocation(parameterDeclaration);
                if (!checker.isArrayType(type) && !checker.isTupleType(type))
                    return false;
            }
            return !parameterDeclaration.modifiers && isIdentifier(parameterDeclaration.name);
        }