function getUseSiteFix(context, expression, errorCode, checker, trackChanges, fixedDeclarations) {
            const changes = trackChanges((t) => makeChange3(t, errorCode, context.sourceFile, checker, expression, fixedDeclarations));
            return createCodeFixAction(fixId3, changes, Diagnostics.Add_await, fixId3, Diagnostics.Fix_all_expressions_possibly_missing_await);
        }