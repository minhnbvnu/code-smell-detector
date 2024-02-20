function isValidUnionType(node) {
                return node.types.every(member => {
                    var _a, _b;
                    return validUnionMembers.includes(member.type) ||
                        // allows any T<..., void, ...> here, checked by checkGenericTypeArgument
                        (member.type === utils_1.AST_NODE_TYPES.TSTypeReference &&
                            ((_a = member.typeParameters) === null || _a === void 0 ? void 0 : _a.type) ===
                                utils_1.AST_NODE_TYPES.TSTypeParameterInstantiation &&
                            ((_b = member.typeParameters) === null || _b === void 0 ? void 0 : _b.params.map(param => param.type).includes(utils_1.AST_NODE_TYPES.TSVoidKeyword)));
                });
            }