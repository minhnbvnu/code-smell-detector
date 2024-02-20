function getDeclarationForBindingElement(element) {
            while (true) {
                if (isBindingElement(element.parent.parent)) {
                    element = element.parent.parent;
                }
                else {
                    return element.parent.parent;
                }
            }
        }