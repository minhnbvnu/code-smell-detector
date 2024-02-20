function _containsModifier(functionDeclaration, modifierName) {
            return functionDeclaration.modifiers.map(modifier => {
                return modifier.name;
            }).includes(modifierName);
        }