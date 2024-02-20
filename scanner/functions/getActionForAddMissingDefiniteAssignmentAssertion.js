function getActionForAddMissingDefiniteAssignmentAssertion(context, info) {
            if (info.isJs)
                return void 0;
            const changes = ts_textChanges_exports.ChangeTracker.with(context, (t) => addDefiniteAssignmentAssertion(t, context.sourceFile, info.prop));
            return createCodeFixAction(fixName6, changes, [Diagnostics.Add_definite_assignment_assertion_to_property_0, info.prop.getText()], fixIdAddDefiniteAssignmentAssertions, Diagnostics.Add_definite_assignment_assertions_to_all_uninitialized_properties);
        }