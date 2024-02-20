function getFix(context, decl, trackChanges, fixedDeclarations) {
            const changes = trackChanges((t) => makeChange2(t, context.sourceFile, decl, fixedDeclarations));
            return createCodeFixAction(fixId2, changes, Diagnostics.Add_async_modifier_to_containing_function, fixId2, Diagnostics.Add_all_missing_async_modifiers);
        }