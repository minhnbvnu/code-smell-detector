function hasContextualTypeWithNoGenericTypes(node, checkMode) {
                const contextualType = (isIdentifier(node) || isPropertyAccessExpression(node) || isElementAccessExpression(node)) && !((isJsxOpeningElement(node.parent) || isJsxSelfClosingElement(node.parent)) && node.parent.tagName === node) && (checkMode && checkMode & 64 /* RestBindingElement */ ? getContextualType2(node, 8 /* SkipBindingPatterns */) : getContextualType2(node, 
                /*contextFlags*/
                void 0));
                return contextualType && !isGenericType(contextualType);
            }