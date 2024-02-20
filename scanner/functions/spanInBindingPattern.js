function spanInBindingPattern(bindingPattern) {
                    const firstBindingElement = forEach(bindingPattern.elements, (element) => element.kind !== 229 /* OmittedExpression */ ? element : void 0);
                    if (firstBindingElement) {
                        return spanInNode(firstBindingElement);
                    }
                    if (bindingPattern.parent.kind === 205 /* BindingElement */) {
                        return textSpan(bindingPattern.parent);
                    }
                    return textSpanFromVariableDeclaration(bindingPattern.parent);
                }