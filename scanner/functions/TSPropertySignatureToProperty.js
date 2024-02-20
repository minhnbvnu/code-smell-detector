function TSPropertySignatureToProperty(node, type = utils_1.AST_NODE_TYPES.Property) {
                const base = {
                    // indent doesn't actually use these
                    key: null,
                    value: null,
                    // Property flags
                    computed: false,
                    method: false,
                    kind: 'init',
                    // this will stop eslint from interrogating the type literal
                    shorthand: true,
                    // location data
                    parent: node.parent,
                    range: node.range,
                    loc: node.loc,
                };
                if (type === utils_1.AST_NODE_TYPES.Property) {
                    return Object.assign({ type }, base);
                }
                else {
                    return Object.assign({ type, static: false, readonly: false, declare: false }, base);
                }
            }