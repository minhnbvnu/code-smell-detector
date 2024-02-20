function getAllSuperTypeNodes(node) {
            return isInterfaceDeclaration(node) ? getInterfaceBaseTypeNodes(node) || emptyArray : isClassLike(node) ? concatenate(singleElementArray(getEffectiveBaseTypeNode(node)), getEffectiveImplementsTypeNodes(node)) || emptyArray : emptyArray;
        }