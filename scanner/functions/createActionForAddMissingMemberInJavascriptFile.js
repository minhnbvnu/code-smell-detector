function createActionForAddMissingMemberInJavascriptFile(context, { parentDeclaration, declSourceFile, modifierFlags, token }) {
            if (isInterfaceDeclaration(parentDeclaration) || isTypeLiteralNode(parentDeclaration)) {
                return void 0;
            }
            const changes = ts_textChanges_exports.ChangeTracker.with(context, (t) => addMissingMemberInJs(t, declSourceFile, parentDeclaration, token, !!(modifierFlags & 32 /* Static */)));
            if (changes.length === 0) {
                return void 0;
            }
            const diagnostic = modifierFlags & 32 /* Static */ ? Diagnostics.Initialize_static_property_0 : isPrivateIdentifier(token) ? Diagnostics.Declare_a_private_field_named_0 : Diagnostics.Initialize_property_0_in_the_constructor;
            return createCodeFixAction(fixMissingMember, changes, [diagnostic, token.text], fixMissingMember, Diagnostics.Add_all_missing_members);
        }