function getActionsForMissingMemberDeclaration(context, info) {
            return info.isJSFile ? singleElementArray(createActionForAddMissingMemberInJavascriptFile(context, info)) : createActionsForAddMissingMemberInTypeScriptFile(context, info);
        }