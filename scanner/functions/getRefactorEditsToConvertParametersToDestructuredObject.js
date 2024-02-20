function getRefactorEditsToConvertParametersToDestructuredObject(context, actionName2) {
            Debug.assert(actionName2 === refactorName8, "Unexpected action name");
            const { file, startPosition, program, cancellationToken, host } = context;
            const functionDeclaration = getFunctionDeclarationAtPosition(file, startPosition, program.getTypeChecker());
            if (!functionDeclaration || !cancellationToken)
                return void 0;
            const groupedReferences = getGroupedReferences(functionDeclaration, program, cancellationToken);
            if (groupedReferences.valid) {
                const edits = ts_textChanges_exports.ChangeTracker.with(context, (t) => doChange36(file, program, host, t, functionDeclaration, groupedReferences));
                return { renameFilename: void 0, renameLocation: void 0, edits };
            }
            return { edits: [] };
        }