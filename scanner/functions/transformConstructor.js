function transformConstructor(constructor, container) {
                constructor = visitNode(constructor, visitor, isConstructorDeclaration);
                if (!(lexicalEnvironment == null ? void 0 : lexicalEnvironment.data) || !(lexicalEnvironment.data.facts & 16 /* WillHoistInitializersToConstructor */)) {
                    return constructor;
                }
                const extendsClauseElement = getEffectiveBaseTypeNode(container);
                const isDerivedClass = !!(extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== 104 /* NullKeyword */);
                const parameters = visitParameterList(constructor ? constructor.parameters : void 0, visitor, context);
                const body = transformConstructorBody(container, constructor, isDerivedClass);
                if (!body) {
                    return constructor;
                }
                if (constructor) {
                    Debug.assert(parameters);
                    return factory2.updateConstructorDeclaration(constructor, 
                    /*modifiers*/
                    void 0, parameters, body);
                }
                return startOnNewLine(setOriginalNode(setTextRange(factory2.createConstructorDeclaration(
                /*modifiers*/
                void 0, parameters != null ? parameters : [], body), constructor || container), constructor));
            }