function parseParameterWorker(inOuterAwaitContext, allowAmbiguity = true) {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        const modifiers = inOuterAwaitContext ? doInAwaitContext(() => parseModifiers(
                        /*allowDecorators*/
                        true)) : doOutsideOfAwaitContext(() => parseModifiers(
                        /*allowDecorators*/
                        true));
                        if (token() === 108 /* ThisKeyword */) {
                            const node2 = factory2.createParameterDeclaration(modifiers, 
                            /*dotDotDotToken*/
                            void 0, createIdentifier(
                            /*isIdentifier*/
                            true), 
                            /*questionToken*/
                            void 0, parseTypeAnnotation(), 
                            /*initializer*/
                            void 0);
                            const modifier = firstOrUndefined(modifiers);
                            if (modifier) {
                                parseErrorAtRange(modifier, Diagnostics.Neither_decorators_nor_modifiers_may_be_applied_to_this_parameters);
                            }
                            return withJSDoc(finishNode(node2, pos), hasJSDoc);
                        }
                        const savedTopLevel = topLevel;
                        topLevel = false;
                        const dotDotDotToken = parseOptionalToken(25 /* DotDotDotToken */);
                        if (!allowAmbiguity && !isParameterNameStart()) {
                            return void 0;
                        }
                        const node = withJSDoc(finishNode(factory2.createParameterDeclaration(modifiers, dotDotDotToken, parseNameOfParameter(modifiers), parseOptionalToken(57 /* QuestionToken */), parseTypeAnnotation(), parseInitializer()), pos), hasJSDoc);
                        topLevel = savedTopLevel;
                        return node;
                    }