function delayedBindJSDocTypedefTag() {
                if (!delayedTypeAliases) {
                    return;
                }
                const saveContainer = container;
                const saveLastContainer = lastContainer;
                const saveBlockScopeContainer = blockScopeContainer;
                const saveParent = parent2;
                const saveCurrentFlow = currentFlow;
                for (const typeAlias of delayedTypeAliases) {
                    const host = typeAlias.parent.parent;
                    container = findAncestor(host.parent, (n) => !!(getContainerFlags(n) & 1 /* IsContainer */)) || file;
                    blockScopeContainer = getEnclosingBlockScopeContainer(host) || file;
                    currentFlow = initFlowNode({ flags: 2 /* Start */ });
                    parent2 = typeAlias;
                    bind(typeAlias.typeExpression);
                    const declName = getNameOfDeclaration(typeAlias);
                    if ((isJSDocEnumTag(typeAlias) || !typeAlias.fullName) && declName && isPropertyAccessEntityNameExpression(declName.parent)) {
                        const isTopLevel = isTopLevelNamespaceAssignment(declName.parent);
                        if (isTopLevel) {
                            bindPotentiallyMissingNamespaces(file.symbol, declName.parent, isTopLevel, !!findAncestor(declName, (d) => isPropertyAccessExpression(d) && d.name.escapedText === "prototype"), 
                            /*containerIsClass*/
                            false);
                            const oldContainer = container;
                            switch (getAssignmentDeclarationPropertyAccessKind(declName.parent)) {
                                case 1 /* ExportsProperty */:
                                case 2 /* ModuleExports */:
                                    if (!isExternalOrCommonJsModule(file)) {
                                        container = void 0;
                                    }
                                    else {
                                        container = file;
                                    }
                                    break;
                                case 4 /* ThisProperty */:
                                    container = declName.parent.expression;
                                    break;
                                case 3 /* PrototypeProperty */:
                                    container = declName.parent.expression.name;
                                    break;
                                case 5 /* Property */:
                                    container = isExportsOrModuleExportsOrAlias(file, declName.parent.expression) ? file : isPropertyAccessExpression(declName.parent.expression) ? declName.parent.expression.name : declName.parent.expression;
                                    break;
                                case 0 /* None */:
                                    return Debug.fail("Shouldn't have detected typedef or enum on non-assignment declaration");
                            }
                            if (container) {
                                declareModuleMember(typeAlias, 524288 /* TypeAlias */, 788968 /* TypeAliasExcludes */);
                            }
                            container = oldContainer;
                        }
                    }
                    else if (isJSDocEnumTag(typeAlias) || !typeAlias.fullName || typeAlias.fullName.kind === 79 /* Identifier */) {
                        parent2 = typeAlias.parent;
                        bindBlockScopedDeclaration(typeAlias, 524288 /* TypeAlias */, 788968 /* TypeAliasExcludes */);
                    }
                    else {
                        bind(typeAlias.fullName);
                    }
                }
                container = saveContainer;
                lastContainer = saveLastContainer;
                blockScopeContainer = saveBlockScopeContainer;
                parent2 = saveParent;
                currentFlow = saveCurrentFlow;
            }