function getParentTypeOfClassElement(node) {
                const classSymbol = getSymbolOfNode(node.parent);
                return isStatic(node) ? getTypeOfSymbol(classSymbol) : getDeclaredTypeOfSymbol(classSymbol);
            }