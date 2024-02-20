function hasRestSibling(node) {
                    var _a;
                    return (node.type === utils_1.AST_NODE_TYPES.Property &&
                        ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.ObjectPattern &&
                        node.parent.properties[node.parent.properties.length - 1].type ===
                            utils_1.AST_NODE_TYPES.RestElement);
                }