function visitInNewClassLexicalEnvironment(node, referencedName, visitor2) {
                const savedCurrentClassContainer = currentClassContainer;
                const savedPendingExpressions = pendingExpressions;
                const savedLexicalEnvironment = lexicalEnvironment;
                currentClassContainer = node;
                pendingExpressions = void 0;
                startClassLexicalEnvironment();
                const shouldAlwaysTransformPrivateStaticElements = getInternalEmitFlags(node) & 32 /* TransformPrivateStaticElements */;
                if (shouldTransformPrivateElementsOrClassStaticBlocks || shouldAlwaysTransformPrivateStaticElements) {
                    const name = getNameOfDeclaration(node);
                    if (name && isIdentifier(name)) {
                        getPrivateIdentifierEnvironment().data.className = name;
                    }
                }
                if (shouldTransformPrivateElementsOrClassStaticBlocks) {
                    const privateInstanceMethodsAndAccessors = getPrivateInstanceMethodsAndAccessors(node);
                    if (some(privateInstanceMethodsAndAccessors)) {
                        getPrivateIdentifierEnvironment().data.weakSetName = createHoistedVariableForClass("instances", privateInstanceMethodsAndAccessors[0].name);
                    }
                }
                const facts = getClassFacts(node);
                if (facts) {
                    getClassLexicalEnvironment().facts = facts;
                }
                if (facts & 8 /* NeedsSubstitutionForThisInClassStaticField */) {
                    enableSubstitutionForClassStaticThisOrSuperReference();
                }
                const result = visitor2(node, facts, referencedName);
                endClassLexicalEnvironment();
                Debug.assert(lexicalEnvironment === savedLexicalEnvironment);
                currentClassContainer = savedCurrentClassContainer;
                pendingExpressions = savedPendingExpressions;
                return result;
            }