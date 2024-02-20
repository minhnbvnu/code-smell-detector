function createScope(parent, typeParameters) {
                currentScope && scopes.push(currentScope);
                currentScope = {
                    overloads: new Map(),
                    parent,
                    typeParameters,
                };
            }