function getDeleteAction(context, { name, jsDocHost, jsDocParameterTag }) {
            const changes = ts_textChanges_exports.ChangeTracker.with(context, (changeTracker) => changeTracker.filterJSDocTags(context.sourceFile, jsDocHost, (t) => t !== jsDocParameterTag));
            return createCodeFixAction(deleteUnmatchedParameter, changes, [Diagnostics.Delete_unused_param_tag_0, name.getText(context.sourceFile)], deleteUnmatchedParameter, Diagnostics.Delete_all_unused_param_tags);
        }