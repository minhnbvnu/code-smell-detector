function getActionForfixWrapTheBlockWithParen(context, declaration, expression) {
            const changes = ts_textChanges_exports.ChangeTracker.with(context, (t) => wrapBlockWithParen(t, context.sourceFile, declaration, expression));
            return createCodeFixAction(fixId22, changes, Diagnostics.Wrap_the_following_body_with_parentheses_which_should_be_an_object_literal, fixIdWrapTheBlockWithParen, Diagnostics.Wrap_all_object_literal_with_parentheses);
        }