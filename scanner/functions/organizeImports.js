function organizeImports(sourceFile, formatContext, host, program, preferences, mode) {
            const changeTracker = ts_textChanges_exports.ChangeTracker.fromContext({ host, formatContext, preferences });
            const shouldSort = mode === "SortAndCombine" /* SortAndCombine */ || mode === "All" /* All */;
            const shouldCombine = shouldSort;
            const shouldRemove = mode === "RemoveUnused" /* RemoveUnused */ || mode === "All" /* All */;
            const topLevelImportGroupDecls = groupImportsByNewlineContiguous(sourceFile, sourceFile.statements.filter(isImportDeclaration));
            const comparer = getOrganizeImportsComparerWithDetection(preferences, shouldSort ? () => detectSortingWorker(topLevelImportGroupDecls, preferences) === 2 /* CaseInsensitive */ : void 0);
            const processImportsOfSameModuleSpecifier = (importGroup) => {
                if (shouldRemove)
                    importGroup = removeUnusedImports(importGroup, sourceFile, program);
                if (shouldCombine)
                    importGroup = coalesceImportsWorker(importGroup, comparer, sourceFile);
                if (shouldSort)
                    importGroup = stableSort(importGroup, (s1, s2) => compareImportsOrRequireStatements(s1, s2, comparer));
                return importGroup;
            };
            topLevelImportGroupDecls.forEach((importGroupDecl) => organizeImportsWorker(importGroupDecl, processImportsOfSameModuleSpecifier));
            if (mode !== "RemoveUnused" /* RemoveUnused */) {
                const topLevelExportDecls = sourceFile.statements.filter(isExportDeclaration);
                organizeImportsWorker(topLevelExportDecls, (group2) => coalesceExportsWorker(group2, comparer));
            }
            for (const ambientModule of sourceFile.statements.filter(isAmbientModule)) {
                if (!ambientModule.body)
                    continue;
                const ambientModuleImportGroupDecls = groupImportsByNewlineContiguous(sourceFile, ambientModule.body.statements.filter(isImportDeclaration));
                ambientModuleImportGroupDecls.forEach((importGroupDecl) => organizeImportsWorker(importGroupDecl, processImportsOfSameModuleSpecifier));
                if (mode !== "RemoveUnused" /* RemoveUnused */) {
                    const ambientModuleExportDecls = ambientModule.body.statements.filter(isExportDeclaration);
                    organizeImportsWorker(ambientModuleExportDecls, (group2) => coalesceExportsWorker(group2, comparer));
                }
            }
            return changeTracker.getChanges();
            function organizeImportsWorker(oldImportDecls, coalesce) {
                if (length(oldImportDecls) === 0) {
                    return;
                }
                suppressLeadingTrivia(oldImportDecls[0]);
                const oldImportGroups = shouldCombine ? group(oldImportDecls, (importDecl) => getExternalModuleName2(importDecl.moduleSpecifier)) : [oldImportDecls];
                const sortedImportGroups = shouldSort ? stableSort(oldImportGroups, (group1, group2) => compareModuleSpecifiersWorker(group1[0].moduleSpecifier, group2[0].moduleSpecifier, comparer)) : oldImportGroups;
                const newImportDecls = flatMap(sortedImportGroups, (importGroup) => getExternalModuleName2(importGroup[0].moduleSpecifier) ? coalesce(importGroup) : importGroup);
                if (newImportDecls.length === 0) {
                    changeTracker.deleteNodes(sourceFile, oldImportDecls, {
                        leadingTriviaOption: ts_textChanges_exports.LeadingTriviaOption.Exclude,
                        trailingTriviaOption: ts_textChanges_exports.TrailingTriviaOption.Include
                    }, 
                    /*hasTrailingComment*/
                    true);
                }
                else {
                    const replaceOptions = {
                        leadingTriviaOption: ts_textChanges_exports.LeadingTriviaOption.Exclude,
                        // Leave header comment in place
                        trailingTriviaOption: ts_textChanges_exports.TrailingTriviaOption.Include,
                        suffix: getNewLineOrDefaultFromHost(host, formatContext.options)
                    };
                    changeTracker.replaceNodeWithNodes(sourceFile, oldImportDecls[0], newImportDecls, replaceOptions);
                    const hasTrailingComment = changeTracker.nodeHasTrailingComment(sourceFile, oldImportDecls[0], replaceOptions);
                    changeTracker.deleteNodes(sourceFile, oldImportDecls.slice(1), {
                        trailingTriviaOption: ts_textChanges_exports.TrailingTriviaOption.Include
                    }, hasTrailingComment);
                }
            }
        }