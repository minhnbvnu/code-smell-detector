function collectUnusedVariables() {
                var _a, _b, _c, _d, _e;
                /**
                 * Checks whether a node is a sibling of the rest property or not.
                 * @param {ASTNode} node a node to check
                 * @returns {boolean} True if the node is a sibling of the rest property, otherwise false.
                 */
                function hasRestSibling(node) {
                    var _a;
                    return (node.type === utils_1.AST_NODE_TYPES.Property &&
                        ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.ObjectPattern &&
                        node.parent.properties[node.parent.properties.length - 1].type ===
                            utils_1.AST_NODE_TYPES.RestElement);
                }
                /**
                 * Determines if a variable has a sibling rest property
                 * @param variable eslint-scope variable object.
                 * @returns True if the variable is exported, false if not.
                 */
                function hasRestSpreadSibling(variable) {
                    if (options.ignoreRestSiblings) {
                        const hasRestSiblingDefinition = variable.defs.some(def => hasRestSibling(def.name.parent));
                        const hasRestSiblingReference = variable.references.some(ref => hasRestSibling(ref.identifier.parent));
                        return hasRestSiblingDefinition || hasRestSiblingReference;
                    }
                    return false;
                }
                /**
                 * Checks whether the given variable is after the last used parameter.
                 * @param variable The variable to check.
                 * @returns `true` if the variable is defined after the last used parameter.
                 */
                function isAfterLastUsedArg(variable) {
                    const def = variable.defs[0];
                    const params = context.getDeclaredVariables(def.node);
                    const posteriorParams = params.slice(params.indexOf(variable) + 1);
                    // If any used parameters occur after this parameter, do not report.
                    return !posteriorParams.some(v => v.references.length > 0 || v.eslintUsed);
                }
                const unusedVariablesOriginal = util.collectUnusedVariables(context);
                const unusedVariablesReturn = [];
                for (const variable of unusedVariablesOriginal) {
                    // explicit global variables don't have definitions.
                    if (variable.defs.length === 0) {
                        unusedVariablesReturn.push(variable);
                        continue;
                    }
                    const def = variable.defs[0];
                    if (variable.scope.type === utils_1.TSESLint.Scope.ScopeType.global &&
                        options.vars === 'local') {
                        // skip variables in the global scope if configured to
                        continue;
                    }
                    const refUsedInArrayPatterns = variable.references.some(ref => { var _a; return ((_a = ref.identifier.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.ArrayPattern; });
                    // skip elements of array destructuring patterns
                    if ((((_a = def.name.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.ArrayPattern ||
                        refUsedInArrayPatterns) &&
                        'name' in def.name &&
                        ((_b = options.destructuredArrayIgnorePattern) === null || _b === void 0 ? void 0 : _b.test(def.name.name))) {
                        continue;
                    }
                    // skip catch variables
                    if (def.type === utils_1.TSESLint.Scope.DefinitionType.CatchClause) {
                        if (options.caughtErrors === 'none') {
                            continue;
                        }
                        // skip ignored parameters
                        if ('name' in def.name &&
                            ((_c = options.caughtErrorsIgnorePattern) === null || _c === void 0 ? void 0 : _c.test(def.name.name))) {
                            continue;
                        }
                    }
                    if (def.type === utils_1.TSESLint.Scope.DefinitionType.Parameter) {
                        // if "args" option is "none", skip any parameter
                        if (options.args === 'none') {
                            continue;
                        }
                        // skip ignored parameters
                        if ('name' in def.name &&
                            ((_d = options.argsIgnorePattern) === null || _d === void 0 ? void 0 : _d.test(def.name.name))) {
                            continue;
                        }
                        // if "args" option is "after-used", skip used variables
                        if (options.args === 'after-used' &&
                            util.isFunction(def.name.parent) &&
                            !isAfterLastUsedArg(variable)) {
                            continue;
                        }
                    }
                    else {
                        // skip ignored variables
                        if ('name' in def.name &&
                            ((_e = options.varsIgnorePattern) === null || _e === void 0 ? void 0 : _e.test(def.name.name))) {
                            continue;
                        }
                    }
                    if (hasRestSpreadSibling(variable)) {
                        continue;
                    }
                    // in case another rule has run and used the collectUnusedVariables,
                    // we want to ensure our selectors that marked variables as used are respected
                    if (variable.eslintUsed) {
                        continue;
                    }
                    unusedVariablesReturn.push(variable);
                }
                return unusedVariablesReturn;
            }