function enableSubstitutionsForCapturedThis() {
                if ((enabledSubstitutions & 1 /* CapturedThis */) === 0) {
                    enabledSubstitutions |= 1 /* CapturedThis */;
                    context.enableSubstitution(108 /* ThisKeyword */);
                    context.enableEmitNotification(173 /* Constructor */);
                    context.enableEmitNotification(171 /* MethodDeclaration */);
                    context.enableEmitNotification(174 /* GetAccessor */);
                    context.enableEmitNotification(175 /* SetAccessor */);
                    context.enableEmitNotification(216 /* ArrowFunction */);
                    context.enableEmitNotification(215 /* FunctionExpression */);
                    context.enableEmitNotification(259 /* FunctionDeclaration */);
                }
            }