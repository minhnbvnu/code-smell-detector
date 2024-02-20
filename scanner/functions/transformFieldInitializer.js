function transformFieldInitializer(node) {
                Debug.assert(!hasDecorators(node), "Decorators should already have been transformed and elided.");
                return isPrivateIdentifierClassElementDeclaration(node) ? transformPrivateFieldInitializer(node) : transformPublicFieldInitializer(node);
            }