function substituteHelperName(node) {
                const name = idText(node);
                let substitution = helperNameSubstitutions.get(name);
                if (!substitution) {
                    helperNameSubstitutions.set(name, substitution = factory2.createUniqueName(name, 16 /* Optimistic */ | 32 /* FileLevel */));
                }
                return substitution;
            }