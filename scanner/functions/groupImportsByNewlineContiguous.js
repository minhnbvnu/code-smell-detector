function groupImportsByNewlineContiguous(sourceFile, importDecls) {
            const scanner2 = createScanner(sourceFile.languageVersion, 
            /*skipTrivia*/
            false, sourceFile.languageVariant);
            const groupImports = [];
            let groupIndex = 0;
            for (const topLevelImportDecl of importDecls) {
                if (groupImports[groupIndex] && isNewGroup(sourceFile, topLevelImportDecl, scanner2)) {
                    groupIndex++;
                }
                if (!groupImports[groupIndex]) {
                    groupImports[groupIndex] = [];
                }
                groupImports[groupIndex].push(topLevelImportDecl);
            }
            return groupImports;
        }