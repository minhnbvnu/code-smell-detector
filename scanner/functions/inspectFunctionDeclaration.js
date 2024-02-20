function inspectFunctionDeclaration(emitted) {
            if (emitted.exit) {
                currentFunctionDeclaration = null;
                return;
            }

            currentFunctionDeclaration = emitted.node;

        }