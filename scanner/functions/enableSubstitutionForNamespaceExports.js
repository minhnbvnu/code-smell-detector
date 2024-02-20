function enableSubstitutionForNamespaceExports() {
                if ((enabledSubstitutions & 2 /* NamespaceExports */) === 0) {
                    enabledSubstitutions |= 2 /* NamespaceExports */;
                    context.enableSubstitution(79 /* Identifier */);
                    context.enableSubstitution(300 /* ShorthandPropertyAssignment */);
                    context.enableEmitNotification(264 /* ModuleDeclaration */);
                }
            }