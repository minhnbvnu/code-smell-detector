function getRenameInfoError(diagnostic) {
            return { canRename: false, localizedErrorMessage: getLocaleSpecificMessage(diagnostic) };
        }