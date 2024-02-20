function getTopLevelDeclarationStatement(d) {
            switch (d.kind) {
                case 257 /* VariableDeclaration */:
                    return d.parent.parent;
                case 205 /* BindingElement */:
                    return getTopLevelDeclarationStatement(cast(d.parent.parent, (p) => isVariableDeclaration(p) || isBindingElement(p)));
                default:
                    return d;
            }
        }