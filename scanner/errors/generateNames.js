function generateNames(node) {
                if (!node)
                    return;
                switch (node.kind) {
                    case 238 /* Block */:
                        forEach(node.statements, generateNames);
                        break;
                    case 253 /* LabeledStatement */:
                    case 251 /* WithStatement */:
                    case 243 /* DoStatement */:
                    case 244 /* WhileStatement */:
                        generateNames(node.statement);
                        break;
                    case 242 /* IfStatement */:
                        generateNames(node.thenStatement);
                        generateNames(node.elseStatement);
                        break;
                    case 245 /* ForStatement */:
                    case 247 /* ForOfStatement */:
                    case 246 /* ForInStatement */:
                        generateNames(node.initializer);
                        generateNames(node.statement);
                        break;
                    case 252 /* SwitchStatement */:
                        generateNames(node.caseBlock);
                        break;
                    case 266 /* CaseBlock */:
                        forEach(node.clauses, generateNames);
                        break;
                    case 292 /* CaseClause */:
                    case 293 /* DefaultClause */:
                        forEach(node.statements, generateNames);
                        break;
                    case 255 /* TryStatement */:
                        generateNames(node.tryBlock);
                        generateNames(node.catchClause);
                        generateNames(node.finallyBlock);
                        break;
                    case 295 /* CatchClause */:
                        generateNames(node.variableDeclaration);
                        generateNames(node.block);
                        break;
                    case 240 /* VariableStatement */:
                        generateNames(node.declarationList);
                        break;
                    case 258 /* VariableDeclarationList */:
                        forEach(node.declarations, generateNames);
                        break;
                    case 257 /* VariableDeclaration */:
                    case 166 /* Parameter */:
                    case 205 /* BindingElement */:
                    case 260 /* ClassDeclaration */:
                        generateNameIfNeeded(node.name);
                        break;
                    case 259 /* FunctionDeclaration */:
                        generateNameIfNeeded(node.name);
                        if (getEmitFlags(node) & 1048576 /* ReuseTempVariableScope */) {
                            forEach(node.parameters, generateNames);
                            generateNames(node.body);
                        }
                        break;
                    case 203 /* ObjectBindingPattern */:
                    case 204 /* ArrayBindingPattern */:
                        forEach(node.elements, generateNames);
                        break;
                    case 269 /* ImportDeclaration */:
                        generateNames(node.importClause);
                        break;
                    case 270 /* ImportClause */:
                        generateNameIfNeeded(node.name);
                        generateNames(node.namedBindings);
                        break;
                    case 271 /* NamespaceImport */:
                        generateNameIfNeeded(node.name);
                        break;
                    case 277 /* NamespaceExport */:
                        generateNameIfNeeded(node.name);
                        break;
                    case 272 /* NamedImports */:
                        forEach(node.elements, generateNames);
                        break;
                    case 273 /* ImportSpecifier */:
                        generateNameIfNeeded(node.propertyName || node.name);
                        break;
                }
            }