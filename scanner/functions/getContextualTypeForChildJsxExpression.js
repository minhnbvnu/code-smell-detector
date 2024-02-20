function getContextualTypeForChildJsxExpression(node, child, contextFlags) {
                const attributesType = getApparentTypeOfContextualType(node.openingElement.tagName, contextFlags);
                const jsxChildrenPropertyName = getJsxElementChildrenPropertyName(getJsxNamespaceAt(node));
                if (!(attributesType && !isTypeAny(attributesType) && jsxChildrenPropertyName && jsxChildrenPropertyName !== "")) {
                    return void 0;
                }
                const realChildren = getSemanticJsxChildren(node.children);
                const childIndex = realChildren.indexOf(child);
                const childFieldType = getTypeOfPropertyOfContextualType(attributesType, jsxChildrenPropertyName);
                return childFieldType && (realChildren.length === 1 ? childFieldType : mapType(childFieldType, (t) => {
                    if (isArrayLikeType(t)) {
                        return getIndexedAccessType(t, getNumberLiteralType(childIndex));
                    }
                    else {
                        return t;
                    }
                }, 
                /*noReductions*/
                true));
            }