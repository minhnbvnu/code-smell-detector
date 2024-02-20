function handleMember(validator, node, modifiers) {
                if (!validator) {
                    return;
                }
                const key = node.key;
                if (requiresQuoting(key, compilerOptions.target)) {
                    modifiers.add(naming_convention_utils_1.Modifiers.requiresQuotes);
                }
                validator(key, modifiers);
            }