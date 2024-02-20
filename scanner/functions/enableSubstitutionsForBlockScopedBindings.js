function enableSubstitutionsForBlockScopedBindings() {
                if ((enabledSubstitutions & 2 /* BlockScopedBindings */) === 0) {
                    enabledSubstitutions |= 2 /* BlockScopedBindings */;
                    context.enableSubstitution(79 /* Identifier */);
                }
            }