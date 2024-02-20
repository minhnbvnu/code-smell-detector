function enableSubstitutionForClassStaticThisOrSuperReference() {
                if ((enabledSubstitutions & 2 /* ClassStaticThisOrSuperReference */) === 0) {
                    enabledSubstitutions |= 2 /* ClassStaticThisOrSuperReference */;
                    context.enableSubstitution(108 /* ThisKeyword */);
                    context.enableEmitNotification(259 /* FunctionDeclaration */);
                    context.enableEmitNotification(215 /* FunctionExpression */);
                    context.enableEmitNotification(173 /* Constructor */);
                    context.enableEmitNotification(174 /* GetAccessor */);
                    context.enableEmitNotification(175 /* SetAccessor */);
                    context.enableEmitNotification(171 /* MethodDeclaration */);
                    context.enableEmitNotification(169 /* PropertyDeclaration */);
                    context.enableEmitNotification(164 /* ComputedPropertyName */);
                }
            }