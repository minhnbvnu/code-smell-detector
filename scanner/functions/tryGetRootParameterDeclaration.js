function tryGetRootParameterDeclaration(node) {
                return tryCast(getRootDeclaration(node), isParameter);
            }