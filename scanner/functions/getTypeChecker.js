function getTypeChecker() {
                return typeChecker || (typeChecker = createTypeChecker(program));
            }