function getCurrentFileNameExpression() {
                if (currentFileState.filenameDeclaration) {
                    return currentFileState.filenameDeclaration.name;
                }
                const declaration = factory2.createVariableDeclaration(factory2.createUniqueName("_jsxFileName", 16 /* Optimistic */ | 32 /* FileLevel */), 
                /*exclaimationToken*/
                void 0, 
                /*type*/
                void 0, factory2.createStringLiteral(currentSourceFile.fileName));
                currentFileState.filenameDeclaration = declaration;
                return currentFileState.filenameDeclaration.name;
            }