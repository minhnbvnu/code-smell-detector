function ambientModuleDeclarationsAreEqual(oldSourceFile, newSourceFile) {
                if (!arrayIsEqualTo(oldSourceFile.ambientModuleNames, newSourceFile.ambientModuleNames)) {
                    return false;
                }
                let oldFileStatementIndex = -1;
                let newFileStatementIndex = -1;
                for (const ambientModuleName of newSourceFile.ambientModuleNames) {
                    const isMatchingModuleDeclaration = (node) => isNonGlobalAmbientModule(node) && node.name.text === ambientModuleName;
                    oldFileStatementIndex = findIndex(oldSourceFile.statements, isMatchingModuleDeclaration, oldFileStatementIndex + 1);
                    newFileStatementIndex = findIndex(newSourceFile.statements, isMatchingModuleDeclaration, newFileStatementIndex + 1);
                    if (oldSourceFile.statements[oldFileStatementIndex] !== newSourceFile.statements[newFileStatementIndex]) {
                        return false;
                    }
                }
                return true;
            }