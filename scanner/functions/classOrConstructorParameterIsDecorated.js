function classOrConstructorParameterIsDecorated(useLegacyDecorators, node) {
            if (nodeIsDecorated(useLegacyDecorators, node))
                return true;
            const constructor = getFirstConstructorWithBody(node);
            return !!constructor && childIsDecorated(useLegacyDecorators, constructor, node);
        }