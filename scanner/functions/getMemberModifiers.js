function getMemberModifiers(node) {
                const modifiers = new Set();
                if ('key' in node && node.key.type === utils_1.AST_NODE_TYPES.PrivateIdentifier) {
                    modifiers.add(naming_convention_utils_1.Modifiers['#private']);
                }
                else if (node.accessibility) {
                    modifiers.add(naming_convention_utils_1.Modifiers[node.accessibility]);
                }
                else {
                    modifiers.add(naming_convention_utils_1.Modifiers.public);
                }
                if (node.static) {
                    modifiers.add(naming_convention_utils_1.Modifiers.static);
                }
                if ('readonly' in node && node.readonly) {
                    modifiers.add(naming_convention_utils_1.Modifiers.readonly);
                }
                if ('override' in node && node.override) {
                    modifiers.add(naming_convention_utils_1.Modifiers.override);
                }
                if (node.type === utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition ||
                    node.type === utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition) {
                    modifiers.add(naming_convention_utils_1.Modifiers.abstract);
                }
                return modifiers;
            }