function getRefactorEditsToInferReturnType(context) {
            const info = getInfo21(context);
            if (info && !isRefactorErrorInfo(info)) {
                const edits = ts_textChanges_exports.ChangeTracker.with(context, (t) => doChange38(context.file, t, info.declaration, info.returnTypeNode));
                return { renameFilename: void 0, renameLocation: void 0, edits };
            }
            return void 0;
        }