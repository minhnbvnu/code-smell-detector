function collectNodeDefinitions(node) {
                var _a, _b, _c, _d, _e;
                const { name } = node.id;
                const found = {
                    imports: [],
                    previousSibling: undefined,
                };
                let scope = context.getScope();
                for (const definition of (_c = (_b = (_a = scope.upper) === null || _a === void 0 ? void 0 : _a.set.get(name)) === null || _b === void 0 ? void 0 : _b.defs) !== null && _c !== void 0 ? _c : []) {
                    if (definition.node.type === utils_1.AST_NODE_TYPES.TSEnumDeclaration &&
                        definition.node.range[0] < node.range[0] &&
                        definition.node.members.length > 0) {
                        found.previousSibling = definition.node;
                        break;
                    }
                }
                while (scope) {
                    (_e = (_d = scope.set.get(name)) === null || _d === void 0 ? void 0 : _d.defs) === null || _e === void 0 ? void 0 : _e.forEach(definition => {
                        if (definition.type === scope_manager_1.DefinitionType.ImportBinding) {
                            found.imports.push(definition.node);
                        }
                    });
                    scope = scope.upper;
                }
                return found;
            }