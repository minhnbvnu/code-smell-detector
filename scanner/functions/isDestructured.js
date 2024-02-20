function isDestructured(id) {
                var _a, _b, _c;
                return (
                // `const { x }`
                // does not match `const { x: y }`
                (((_a = id.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.Property && id.parent.shorthand) ||
                    // `const { x = 2 }`
                    // does not match const `{ x: y = 2 }`
                    (((_b = id.parent) === null || _b === void 0 ? void 0 : _b.type) === utils_1.AST_NODE_TYPES.AssignmentPattern &&
                        ((_c = id.parent.parent) === null || _c === void 0 ? void 0 : _c.type) === utils_1.AST_NODE_TYPES.Property &&
                        id.parent.parent.shorthand));
            }