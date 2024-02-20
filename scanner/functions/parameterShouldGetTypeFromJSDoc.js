function parameterShouldGetTypeFromJSDoc(node) {
            return isDeclarationWithType(node) && hasUsableJSDoc(node);
        }