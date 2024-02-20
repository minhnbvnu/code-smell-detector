function processLoopVariableDeclaration(container, decl, loopParameters, loopOutParameters, hasCapturedBindingsInForHead) {
                const name = decl.name;
                if (isBindingPattern(name)) {
                    for (const element of name.elements) {
                        if (!isOmittedExpression(element)) {
                            processLoopVariableDeclaration(container, element, loopParameters, loopOutParameters, hasCapturedBindingsInForHead);
                        }
                    }
                }
                else {
                    loopParameters.push(factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, name));
                    const checkFlags = resolver.getNodeCheckFlags(decl);
                    if (checkFlags & 262144 /* NeedsLoopOutParameter */ || hasCapturedBindingsInForHead) {
                        const outParamName = factory2.createUniqueName("out_" + idText(name));
                        let flags = 0 /* None */;
                        if (checkFlags & 262144 /* NeedsLoopOutParameter */) {
                            flags |= 1 /* Body */;
                        }
                        if (isForStatement(container)) {
                            if (container.initializer && resolver.isBindingCapturedByNode(container.initializer, decl)) {
                                flags |= 2 /* Initializer */;
                            }
                            if (container.condition && resolver.isBindingCapturedByNode(container.condition, decl) || container.incrementor && resolver.isBindingCapturedByNode(container.incrementor, decl)) {
                                flags |= 1 /* Body */;
                            }
                        }
                        loopOutParameters.push({ flags, originalName: name, outParamName });
                    }
                }
            }