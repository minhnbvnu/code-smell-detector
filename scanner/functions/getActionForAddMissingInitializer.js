function getActionForAddMissingInitializer(context, info) {
            if (info.isJs)
                return void 0;
            const checker = context.program.getTypeChecker();
            const initializer = getInitializer(checker, info.prop);
            if (!initializer)
                return void 0;
            const changes = ts_textChanges_exports.ChangeTracker.with(context, (t) => addInitializer(t, context.sourceFile, info.prop, initializer));
            return createCodeFixAction(fixName6, changes, [Diagnostics.Add_initializer_to_property_0, info.prop.name.getText()], fixIdAddInitializer, Diagnostics.Add_initializers_to_all_uninitialized_properties);
        }