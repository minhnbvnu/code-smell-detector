function applyCodeActionCommand(fileName, actionOrFormatSettingsOrUndefined) {
                const action = typeof fileName === "string" ? actionOrFormatSettingsOrUndefined : fileName;
                return isArray(action) ? Promise.all(action.map((a) => applySingleCodeActionCommand(a))) : applySingleCodeActionCommand(action);
            }