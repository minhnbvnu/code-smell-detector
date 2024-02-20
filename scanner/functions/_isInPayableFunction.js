function _isInPayableFunction() {
            return _containsModifier(currentFunctionDeclaration, "payable");
        }