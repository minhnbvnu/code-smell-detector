function _isPrivateFunction() {
            return (
                _containsModifier(currentFunctionDeclaration, "private") ||
                _containsModifier(currentFunctionDeclaration, "internal")
            );
        }