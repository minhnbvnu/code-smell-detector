function getActionsForMissingMethodDeclaration(context, info) {
            const { parentDeclaration, declSourceFile, modifierFlags, token, call } = info;
            if (call === void 0) {
                return void 0;
            }
            if (isPrivateIdentifier(token)) {
                return void 0;
            }
            const methodName = token.text;
            const addMethodDeclarationChanges = (modifierFlags2) => ts_textChanges_exports.ChangeTracker.with(context, (t) => addMethodDeclaration(context, t, call, token, modifierFlags2, parentDeclaration, declSourceFile));
            const actions2 = [createCodeFixAction(fixMissingMember, addMethodDeclarationChanges(modifierFlags & 32 /* Static */), [modifierFlags & 32 /* Static */ ? Diagnostics.Declare_static_method_0 : Diagnostics.Declare_method_0, methodName], fixMissingMember, Diagnostics.Add_all_missing_members)];
            if (modifierFlags & 8 /* Private */) {
                actions2.unshift(createCodeFixActionWithoutFixAll(fixMissingMember, addMethodDeclarationChanges(8 /* Private */), [Diagnostics.Declare_private_method_0, methodName]));
            }
            return actions2;
        }