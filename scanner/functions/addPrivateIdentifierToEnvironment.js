function addPrivateIdentifierToEnvironment(node, name, addDeclaration) {
                const lex = getClassLexicalEnvironment();
                const privateEnv = getPrivateIdentifierEnvironment();
                const previousInfo = getPrivateIdentifier(privateEnv, name);
                const isStatic2 = hasStaticModifier(node);
                const isValid = !isReservedPrivateName(name) && previousInfo === void 0;
                addDeclaration(node, name, lex, privateEnv, isStatic2, isValid, previousInfo);
            }