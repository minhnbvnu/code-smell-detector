function isEmptyBindingName(bindingName) {
            if (!bindingName) {
                return true;
            }
            if (isSynthIdentifier(bindingName)) {
                return !bindingName.identifier.text;
            }
            return every(bindingName.elements, isEmptyBindingName);
        }