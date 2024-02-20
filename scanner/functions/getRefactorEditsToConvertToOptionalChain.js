function getRefactorEditsToConvertToOptionalChain(context, actionName2) {
            const info = getInfo20(context);
            Debug.assert(info && !isRefactorErrorInfo(info), "Expected applicable refactor info");
            const edits = ts_textChanges_exports.ChangeTracker.with(context, (t) => doChange37(context.file, context.program.getTypeChecker(), t, info, actionName2));
            return { edits, renameFilename: void 0, renameLocation: void 0 };
        }