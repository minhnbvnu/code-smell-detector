function getAssignedMessageData(unusedVar) {
                        var _a;
                        const def = unusedVar.defs[0];
                        let additional = '';
                        if (options.destructuredArrayIgnorePattern &&
                            ((_a = def === null || def === void 0 ? void 0 : def.name.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.ArrayPattern) {
                            additional = `. Allowed unused elements of array destructuring patterns must match ${options.destructuredArrayIgnorePattern.toString()}`;
                        }
                        else if (options.varsIgnorePattern) {
                            additional = `. Allowed unused vars must match ${options.varsIgnorePattern.toString()}`;
                        }
                        return {
                            varName: unusedVar.name,
                            action: 'assigned a value',
                            additional,
                        };
                    }