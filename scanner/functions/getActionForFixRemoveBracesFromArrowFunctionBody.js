function getActionForFixRemoveBracesFromArrowFunctionBody(context, declaration, expression, commentSource) {
            const changes = ts_textChanges_exports.ChangeTracker.with(context, (t) => removeBlockBodyBrace(t, context.sourceFile, declaration, expression, commentSource, 
            /* withParen */
            false));
            return createCodeFixAction(fixId22, changes, Diagnostics.Remove_braces_from_arrow_function_body, fixRemoveBracesFromArrowFunctionBody, Diagnostics.Remove_braces_from_all_arrow_function_bodies_with_relevant_issues);
        }