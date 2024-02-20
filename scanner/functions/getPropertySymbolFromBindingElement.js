function getPropertySymbolFromBindingElement(checker, bindingElement) {
            const typeOfPattern = checker.getTypeAtLocation(bindingElement.parent);
            return typeOfPattern && checker.getPropertyOfType(typeOfPattern, bindingElement.name.text);
        }