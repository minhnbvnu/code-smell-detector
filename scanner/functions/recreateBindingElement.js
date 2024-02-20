function recreateBindingElement(e) {
                if (e.kind === 229 /* OmittedExpression */) {
                    return;
                }
                if (e.name) {
                    if (!getBindingNameVisible(e))
                        return;
                    if (isBindingPattern(e.name)) {
                        return recreateBindingPattern(e.name);
                    }
                    else {
                        return factory2.createVariableDeclaration(e.name, 
                        /*exclamationToken*/
                        void 0, ensureType(e, 
                        /*type*/
                        void 0), 
                        /*initializer*/
                        void 0);
                    }
                }
            }