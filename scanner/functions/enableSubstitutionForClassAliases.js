function enableSubstitutionForClassAliases() {
                if (!classAliases) {
                    context.enableSubstitution(79 /* Identifier */);
                    classAliases = [];
                }
            }