function codeFixAll(context, errorCodes63, use) {
            const commands = [];
            const changes = ts_textChanges_exports.ChangeTracker.with(context, (t) => eachDiagnostic(context, errorCodes63, (diag2) => use(t, diag2, commands)));
            return createCombinedCodeActions(changes, commands.length === 0 ? void 0 : commands);
        }