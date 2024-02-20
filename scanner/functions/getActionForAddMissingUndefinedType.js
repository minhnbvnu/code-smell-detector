function getActionForAddMissingUndefinedType(context, info) {
            const changes = ts_textChanges_exports.ChangeTracker.with(context, (t) => addUndefinedType(t, context.sourceFile, info));
            return createCodeFixAction(fixName6, changes, [Diagnostics.Add_undefined_type_to_property_0, info.prop.name.getText()], fixIdAddUndefinedType, Diagnostics.Add_undefined_type_to_all_uninitialized_properties);
        }