function checkSourceFileWorker(node) {
                const links = getNodeLinks(node);
                if (!(links.flags & 1 /* TypeChecked */)) {
                    if (skipTypeChecking(node, compilerOptions, host)) {
                        return;
                    }
                    checkGrammarSourceFile(node);
                    clear(potentialThisCollisions);
                    clear(potentialNewTargetCollisions);
                    clear(potentialWeakMapSetCollisions);
                    clear(potentialReflectCollisions);
                    clear(potentialUnusedRenamedBindingElementsInTypes);
                    forEach(node.statements, checkSourceElement);
                    checkSourceElement(node.endOfFileToken);
                    checkDeferredNodes(node);
                    if (isExternalOrCommonJsModule(node)) {
                        registerForUnusedIdentifiersCheck(node);
                    }
                    addLazyDiagnostic(() => {
                        if (!node.isDeclarationFile && (compilerOptions.noUnusedLocals || compilerOptions.noUnusedParameters)) {
                            checkUnusedIdentifiers(getPotentiallyUnusedIdentifiers(node), (containingNode, kind, diag2) => {
                                if (!containsParseError(containingNode) && unusedIsError(kind, !!(containingNode.flags & 16777216 /* Ambient */))) {
                                    diagnostics.add(diag2);
                                }
                            });
                        }
                        if (!node.isDeclarationFile) {
                            checkPotentialUncheckedRenamedBindingElementsInTypes();
                        }
                    });
                    if (compilerOptions.importsNotUsedAsValues === 2 /* Error */ && !node.isDeclarationFile && isExternalModule(node)) {
                        checkImportsForTypeOnlyConversion(node);
                    }
                    if (isExternalOrCommonJsModule(node)) {
                        checkExternalModuleExports(node);
                    }
                    if (potentialThisCollisions.length) {
                        forEach(potentialThisCollisions, checkIfThisIsCapturedInEnclosingScope);
                        clear(potentialThisCollisions);
                    }
                    if (potentialNewTargetCollisions.length) {
                        forEach(potentialNewTargetCollisions, checkIfNewTargetIsCapturedInEnclosingScope);
                        clear(potentialNewTargetCollisions);
                    }
                    if (potentialWeakMapSetCollisions.length) {
                        forEach(potentialWeakMapSetCollisions, checkWeakMapSetCollision);
                        clear(potentialWeakMapSetCollisions);
                    }
                    if (potentialReflectCollisions.length) {
                        forEach(potentialReflectCollisions, checkReflectCollision);
                        clear(potentialReflectCollisions);
                    }
                    links.flags |= 1 /* TypeChecked */;
                }
            }