function getApparentTypeOfContextualType(node, contextFlags) {
                const contextualType = isObjectLiteralMethod(node) ? getContextualTypeForObjectLiteralMethod(node, contextFlags) : getContextualType2(node, contextFlags);
                const instantiatedType = instantiateContextualType(contextualType, node, contextFlags);
                if (instantiatedType && !(contextFlags && contextFlags & 2 /* NoConstraints */ && instantiatedType.flags & 8650752 /* TypeVariable */)) {
                    const apparentType = mapType(instantiatedType, getApparentType, 
                    /*noReductions*/
                    true);
                    return apparentType.flags & 1048576 /* Union */ && isObjectLiteralExpression(node) ? discriminateContextualTypeByObjectMembers(node, apparentType) : apparentType.flags & 1048576 /* Union */ && isJsxAttributes(node) ? discriminateContextualTypeByJSXAttributes(node, apparentType) : apparentType;
                }
            }