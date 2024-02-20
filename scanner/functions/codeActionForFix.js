function codeActionForFix(context, sourceFile, symbolName2, fix, includeSymbolNameInDescription, compilerOptions, preferences) {
            let diag2;
            const changes = ts_textChanges_exports.ChangeTracker.with(context, (tracker) => {
                diag2 = codeActionForFixWorker(tracker, sourceFile, symbolName2, fix, includeSymbolNameInDescription, compilerOptions, preferences);
            });
            return createCodeFixAction(importFixName, changes, diag2, importFixId, Diagnostics.Add_all_missing_imports);
        }