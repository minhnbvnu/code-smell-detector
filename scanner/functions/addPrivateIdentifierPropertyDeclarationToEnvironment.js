function addPrivateIdentifierPropertyDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, _previousInfo) {
                var _a2;
                if (isStatic2) {
                    const brandCheckIdentifier = Debug.checkDefined((_a2 = lex.classThis) != null ? _a2 : lex.classConstructor, "classConstructor should be set in private identifier environment");
                    const variableName = createHoistedVariableForPrivateName(name);
                    setPrivateIdentifier(privateEnv, name, {
                        kind: "f" /* Field */,
                        isStatic: true,
                        brandCheckIdentifier,
                        variableName,
                        isValid
                    });
                }
                else {
                    const weakMapName = createHoistedVariableForPrivateName(name);
                    setPrivateIdentifier(privateEnv, name, {
                        kind: "f" /* Field */,
                        isStatic: false,
                        brandCheckIdentifier: weakMapName,
                        isValid
                    });
                    getPendingExpressions().push(factory2.createAssignment(weakMapName, factory2.createNewExpression(factory2.createIdentifier("WeakMap"), 
                    /*typeArguments*/
                    void 0, [])));
                }
            }