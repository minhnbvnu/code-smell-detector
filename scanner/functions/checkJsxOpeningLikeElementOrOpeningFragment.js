function checkJsxOpeningLikeElementOrOpeningFragment(node) {
                const isNodeOpeningLikeElement = isJsxOpeningLikeElement(node);
                if (isNodeOpeningLikeElement) {
                    checkGrammarJsxElement(node);
                }
                checkJsxPreconditions(node);
                if (!getJsxNamespaceContainerForImplicitImport(node)) {
                    const jsxFactoryRefErr = diagnostics && compilerOptions.jsx === 2 /* React */ ? Diagnostics.Cannot_find_name_0 : void 0;
                    const jsxFactoryNamespace = getJsxNamespace(node);
                    const jsxFactoryLocation = isNodeOpeningLikeElement ? node.tagName : node;
                    let jsxFactorySym;
                    if (!(isJsxOpeningFragment(node) && jsxFactoryNamespace === "null")) {
                        jsxFactorySym = resolveName(jsxFactoryLocation, jsxFactoryNamespace, 111551 /* Value */, jsxFactoryRefErr, jsxFactoryNamespace, 
                        /*isUse*/
                        true);
                    }
                    if (jsxFactorySym) {
                        jsxFactorySym.isReferenced = 67108863 /* All */;
                        if (!compilerOptions.verbatimModuleSyntax && jsxFactorySym.flags & 2097152 /* Alias */ && !getTypeOnlyAliasDeclaration(jsxFactorySym)) {
                            markAliasSymbolAsReferenced(jsxFactorySym);
                        }
                    }
                    if (isJsxOpeningFragment(node)) {
                        const file = getSourceFileOfNode(node);
                        const localJsxNamespace = getLocalJsxNamespace(file);
                        if (localJsxNamespace) {
                            resolveName(jsxFactoryLocation, localJsxNamespace, 111551 /* Value */, jsxFactoryRefErr, localJsxNamespace, 
                            /*isUse*/
                            true);
                        }
                    }
                }
                if (isNodeOpeningLikeElement) {
                    const jsxOpeningLikeNode = node;
                    const sig = getResolvedSignature(jsxOpeningLikeNode);
                    checkDeprecatedSignature(sig, node);
                    checkJsxReturnAssignableToAppropriateBound(getJsxReferenceKind(jsxOpeningLikeNode), getReturnTypeOfSignature(sig), jsxOpeningLikeNode);
                }
            }