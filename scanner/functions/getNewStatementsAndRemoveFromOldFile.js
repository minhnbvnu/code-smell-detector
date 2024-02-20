function getNewStatementsAndRemoveFromOldFile(oldFile, usage, changes, toMove, program, host, newFilename, preferences) {
            const checker = program.getTypeChecker();
            const prologueDirectives = takeWhile(oldFile.statements, isPrologueDirective);
            if (oldFile.externalModuleIndicator === void 0 && oldFile.commonJsModuleIndicator === void 0 && usage.oldImportsNeededByNewFile.size() === 0) {
                deleteMovedStatements(oldFile, toMove.ranges, changes);
                return [...prologueDirectives, ...toMove.all];
            }
            const useEsModuleSyntax = !!oldFile.externalModuleIndicator;
            const quotePreference = getQuotePreference(oldFile, preferences);
            const importsFromNewFile = createOldFileImportsFromNewFile(oldFile, usage.oldFileImportsFromNewFile, newFilename, program, host, useEsModuleSyntax, quotePreference);
            if (importsFromNewFile) {
                insertImports(changes, oldFile, importsFromNewFile, 
                /*blankLineBetween*/
                true, preferences);
            }
            deleteUnusedOldImports(oldFile, toMove.all, changes, usage.unusedImportsFromOldFile, checker);
            deleteMovedStatements(oldFile, toMove.ranges, changes);
            updateImportsInOtherFiles(changes, program, host, oldFile, usage.movedSymbols, newFilename);
            const imports = getNewFileImportsAndAddExportInOldFile(oldFile, usage.oldImportsNeededByNewFile, usage.newFileImportsFromOldFile, changes, checker, program, host, useEsModuleSyntax, quotePreference);
            const body = addExports(oldFile, toMove.all, usage.oldFileImportsFromNewFile, useEsModuleSyntax);
            if (imports.length && body.length) {
                return [
                    ...prologueDirectives,
                    ...imports,
                    4 /* NewLineTrivia */,
                    ...body
                ];
            }
            return [
                ...prologueDirectives,
                ...imports,
                ...body
            ];
        }