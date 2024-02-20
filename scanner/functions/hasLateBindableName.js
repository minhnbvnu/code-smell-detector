function hasLateBindableName(node) {
                const name = getNameOfDeclaration(node);
                return !!name && isLateBindableName(name);
            }