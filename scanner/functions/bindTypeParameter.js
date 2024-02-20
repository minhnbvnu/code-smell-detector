function bindTypeParameter(node) {
                var _a2, _b;
                if (isJSDocTemplateTag(node.parent)) {
                    const container2 = getEffectiveContainerForJSDocTemplateTag(node.parent);
                    if (container2) {
                        Debug.assertNode(container2, canHaveLocals);
                        (_a2 = container2.locals) != null ? _a2 : container2.locals = createSymbolTable();
                        declareSymbol(container2.locals, 
                        /*parent*/
                        void 0, node, 262144 /* TypeParameter */, 526824 /* TypeParameterExcludes */);
                    }
                    else {
                        declareSymbolAndAddToSymbolTable(node, 262144 /* TypeParameter */, 526824 /* TypeParameterExcludes */);
                    }
                }
                else if (node.parent.kind === 192 /* InferType */) {
                    const container2 = getInferTypeContainer(node.parent);
                    if (container2) {
                        Debug.assertNode(container2, canHaveLocals);
                        (_b = container2.locals) != null ? _b : container2.locals = createSymbolTable();
                        declareSymbol(container2.locals, 
                        /*parent*/
                        void 0, node, 262144 /* TypeParameter */, 526824 /* TypeParameterExcludes */);
                    }
                    else {
                        bindAnonymousDeclaration(node, 262144 /* TypeParameter */, getDeclarationName(node));
                    }
                }
                else {
                    declareSymbolAndAddToSymbolTable(node, 262144 /* TypeParameter */, 526824 /* TypeParameterExcludes */);
                }
            }