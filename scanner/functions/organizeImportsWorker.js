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