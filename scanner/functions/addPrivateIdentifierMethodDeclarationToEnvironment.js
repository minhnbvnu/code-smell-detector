function addPrivateIdentifierMethodDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, _previousInfo) {
                var _a2;
                const methodName = createHoistedVariableForPrivateName(name);
                const brandCheckIdentifier = isStatic2 ? Debug.checkDefined((_a2 = lex.classThis) != null ? _a2 : lex.classConstructor, "classConstructor should be set in private identifier environment") : Debug.checkDefined(privateEnv.data.weakSetName, "weakSetName should be set in private identifier environment");
                setPrivateIdentifier(privateEnv, name, {
                    kind: "m" /* Method */,
                    methodName,
                    brandCheckIdentifier,
                    isStatic: isStatic2,
                    isValid
                });
            }