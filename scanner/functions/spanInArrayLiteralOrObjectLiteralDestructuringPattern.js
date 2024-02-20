function spanInArrayLiteralOrObjectLiteralDestructuringPattern(node2) {
                    Debug.assert(node2.kind !== 204 /* ArrayBindingPattern */ && node2.kind !== 203 /* ObjectBindingPattern */);
                    const elements = node2.kind === 206 /* ArrayLiteralExpression */ ? node2.elements : node2.properties;
                    const firstBindingElement = forEach(elements, (element) => element.kind !== 229 /* OmittedExpression */ ? element : void 0);
                    if (firstBindingElement) {
                        return spanInNode(firstBindingElement);
                    }
                    return textSpan(node2.parent.kind === 223 /* BinaryExpression */ ? node2.parent : node2);
                }