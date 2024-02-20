function enableSubstitutionForAsyncMethodsWithSuper() {
                if ((enabledSubstitutions & 1 /* AsyncMethodsWithSuper */) === 0) {
                    enabledSubstitutions |= 1 /* AsyncMethodsWithSuper */;
                    context.enableSubstitution(210 /* CallExpression */);
                    context.enableSubstitution(208 /* PropertyAccessExpression */);
                    context.enableSubstitution(209 /* ElementAccessExpression */);
                    context.enableEmitNotification(260 /* ClassDeclaration */);
                    context.enableEmitNotification(171 /* MethodDeclaration */);
                    context.enableEmitNotification(174 /* GetAccessor */);
                    context.enableEmitNotification(175 /* SetAccessor */);
                    context.enableEmitNotification(173 /* Constructor */);
                    context.enableEmitNotification(240 /* VariableStatement */);
                }
            }