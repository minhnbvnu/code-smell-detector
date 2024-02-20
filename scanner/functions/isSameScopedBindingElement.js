function isSameScopedBindingElement(node, declaration) {
                if (isBindingElement(declaration)) {
                    const bindingElement = findAncestor(node, isBindingElement);
                    return bindingElement && getRootDeclaration(bindingElement) === getRootDeclaration(declaration);
                }
            }