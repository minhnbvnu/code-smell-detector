function addPrivateIdentifierGetAccessorDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, previousInfo) {
                var _a2;
                const getterName = createHoistedVariableForPrivateName(name, "_get");
                const brandCheckIdentifier = isStatic2 ? Debug.checkDefined((_a2 = lex.classThis) != null ? _a2 : lex.classConstructor, "classConstructor should be set in private identifier environment") : Debug.checkDefined(privateEnv.data.weakSetName, "weakSetName should be set in private identifier environment");
                if ((previousInfo == null ? void 0 : previousInfo.kind) === "a" /* Accessor */ && previousInfo.isStatic === isStatic2 && !previousInfo.getterName) {
                    previousInfo.getterName = getterName;
                }
                else {
                    setPrivateIdentifier(privateEnv, name, {
                        kind: "a" /* Accessor */,
                        getterName,
                        setterName: void 0,
                        brandCheckIdentifier,
                        isStatic: isStatic2,
                        isValid
                    });
                }
            }