function isDeclarationBindingElement(bindingElement) {
            switch (bindingElement.kind) {
                case 257 /* VariableDeclaration */:
                case 166 /* Parameter */:
                case 205 /* BindingElement */:
                    return true;
            }
            return false;
        }