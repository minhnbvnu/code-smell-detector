function getRefactorActionsToConvertOverloadsToOneSignature(context) {
            const { file, startPosition, program } = context;
            const info = getConvertableOverloadListAtPosition(file, startPosition, program);
            if (!info)
                return emptyArray;
            return [{
                    name: refactorName5,
                    description: refactorDescription,
                    actions: [functionOverloadAction]
                }];
        }