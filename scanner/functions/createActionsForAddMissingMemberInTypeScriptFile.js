function createActionsForAddMissingMemberInTypeScriptFile(context, { parentDeclaration, declSourceFile, modifierFlags, token }) {
            const memberName = token.text;
            const isStatic2 = modifierFlags & 32 /* Static */;
            const typeNode = getTypeNode2(context.program.getTypeChecker(), parentDeclaration, token);
            const addPropertyDeclarationChanges = (modifierFlags2) => ts_textChanges_exports.ChangeTracker.with(context, (t) => addPropertyDeclaration(t, declSourceFile, parentDeclaration, memberName, typeNode, modifierFlags2));
            const actions2 = [createCodeFixAction(fixMissingMember, addPropertyDeclarationChanges(modifierFlags & 32 /* Static */), [isStatic2 ? Diagnostics.Declare_static_property_0 : Diagnostics.Declare_property_0, memberName], fixMissingMember, Diagnostics.Add_all_missing_members)];
            if (isStatic2 || isPrivateIdentifier(token)) {
                return actions2;
            }
            if (modifierFlags & 8 /* Private */) {
                actions2.unshift(createCodeFixActionWithoutFixAll(fixMissingMember, addPropertyDeclarationChanges(8 /* Private */), [Diagnostics.Declare_private_property_0, memberName]));
            }
            actions2.push(createAddIndexSignatureAction(context, declSourceFile, parentDeclaration, token.text, typeNode));
            return actions2;
        }