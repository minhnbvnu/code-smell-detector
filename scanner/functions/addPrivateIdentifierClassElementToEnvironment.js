function addPrivateIdentifierClassElementToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo) {
                if (isAutoAccessorPropertyDeclaration(node)) {
                    addPrivateIdentifierAutoAccessorPropertyDeclarationToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo);
                }
                else if (isPropertyDeclaration(node)) {
                    addPrivateIdentifierPropertyDeclarationToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo);
                }
                else if (isMethodDeclaration(node)) {
                    addPrivateIdentifierMethodDeclarationToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo);
                }
                else if (isGetAccessorDeclaration(node)) {
                    addPrivateIdentifierGetAccessorDeclarationToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo);
                }
                else if (isSetAccessorDeclaration(node)) {
                    addPrivateIdentifierSetAccessorDeclarationToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo);
                }
            }