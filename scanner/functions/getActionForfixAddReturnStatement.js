function getActionForfixAddReturnStatement(context, expression, statement) {
            const changes = ts_textChanges_exports.ChangeTracker.with(context, (t) => addReturnStatement(t, context.sourceFile, expression, statement));
            return createCodeFixAction(fixId22, changes, Diagnostics.Add_a_return_statement, fixIdAddReturnStatement, Diagnostics.Add_all_missing_return_statement);
        }