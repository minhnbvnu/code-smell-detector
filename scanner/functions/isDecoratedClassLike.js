function isDecoratedClassLike(node) {
                return classOrConstructorParameterIsDecorated(
                /*legacyDecorators*/
                false, node) || childIsDecorated(
                /*legacyDecorators*/
                false, node);
            }