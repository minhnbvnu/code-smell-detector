function collectExternalModuleReferences(file) {
                if (file.imports) {
                    return;
                }
                const isJavaScriptFile = isSourceFileJS(file);
                const isExternalModuleFile = isExternalModule(file);
                let imports;
                let moduleAugmentations;
                let ambientModules;
                if ((getIsolatedModules(options) || isExternalModuleFile) && !file.isDeclarationFile) {
                    if (options.importHelpers) {
                        imports = [createSyntheticImport(externalHelpersModuleNameText, file)];
                    }
                    const jsxImport = getJSXRuntimeImport(getJSXImplicitImportBase(options, file), options);
                    if (jsxImport) {
                        (imports || (imports = [])).push(createSyntheticImport(jsxImport, file));
                    }
                }
                for (const node of file.statements) {
                    collectModuleReferences(node, 
                    /*inAmbientModule*/
                    false);
                }
                const shouldProcessRequires = isJavaScriptFile && shouldResolveJsRequire(options);
                if (file.flags & 2097152 /* PossiblyContainsDynamicImport */ || shouldProcessRequires) {
                    collectDynamicImportOrRequireCalls(file);
                }
                file.imports = imports || emptyArray;
                file.moduleAugmentations = moduleAugmentations || emptyArray;
                file.ambientModuleNames = ambientModules || emptyArray;
                return;
                function collectModuleReferences(node, inAmbientModule) {
                    if (isAnyImportOrReExport(node)) {
                        const moduleNameExpr = getExternalModuleName(node);
                        if (moduleNameExpr && isStringLiteral(moduleNameExpr) && moduleNameExpr.text && (!inAmbientModule || !isExternalModuleNameRelative(moduleNameExpr.text))) {
                            setParentRecursive(node, 
                            /*incremental*/
                            false);
                            imports = append(imports, moduleNameExpr);
                            if (!usesUriStyleNodeCoreModules && currentNodeModulesDepth === 0 && !file.isDeclarationFile) {
                                usesUriStyleNodeCoreModules = startsWith(moduleNameExpr.text, "node:");
                            }
                        }
                    }
                    else if (isModuleDeclaration(node)) {
                        if (isAmbientModule(node) && (inAmbientModule || hasSyntacticModifier(node, 2 /* Ambient */) || file.isDeclarationFile)) {
                            node.name.parent = node;
                            const nameText = getTextOfIdentifierOrLiteral(node.name);
                            if (isExternalModuleFile || inAmbientModule && !isExternalModuleNameRelative(nameText)) {
                                (moduleAugmentations || (moduleAugmentations = [])).push(node.name);
                            }
                            else if (!inAmbientModule) {
                                if (file.isDeclarationFile) {
                                    (ambientModules || (ambientModules = [])).push(nameText);
                                }
                                const body = node.body;
                                if (body) {
                                    for (const statement of body.statements) {
                                        collectModuleReferences(statement, 
                                        /*inAmbientModule*/
                                        true);
                                    }
                                }
                            }
                        }
                    }
                }
                function collectDynamicImportOrRequireCalls(file2) {
                    const r = /import|require/g;
                    while (r.exec(file2.text) !== null) {
                        const node = getNodeAtPosition(file2, r.lastIndex);
                        if (shouldProcessRequires && isRequireCall(node, 
                        /*checkArgumentIsStringLiteralLike*/
                        true)) {
                            setParentRecursive(node, 
                            /*incremental*/
                            false);
                            imports = append(imports, node.arguments[0]);
                        }
                        else if (isImportCall(node) && node.arguments.length >= 1 && isStringLiteralLike(node.arguments[0])) {
                            setParentRecursive(node, 
                            /*incremental*/
                            false);
                            imports = append(imports, node.arguments[0]);
                        }
                        else if (isLiteralImportTypeNode(node)) {
                            setParentRecursive(node, 
                            /*incremental*/
                            false);
                            imports = append(imports, node.argument.literal);
                        }
                    }
                }
                function getNodeAtPosition(sourceFile, position) {
                    let current = sourceFile;
                    const getContainingChild = (child) => {
                        if (child.pos <= position && (position < child.end || position === child.end && child.kind === 1 /* EndOfFileToken */)) {
                            return child;
                        }
                    };
                    while (true) {
                        const child = isJavaScriptFile && hasJSDocNodes(current) && forEach(current.jsDoc, getContainingChild) || forEachChild(current, getContainingChild);
                        if (!child) {
                            return current;
                        }
                        current = child;
                    }
                }
            }