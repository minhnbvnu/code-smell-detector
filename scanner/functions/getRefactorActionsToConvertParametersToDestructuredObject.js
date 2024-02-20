function getRefactorActionsToConvertParametersToDestructuredObject(context) {
            const { file, startPosition } = context;
            const isJSFile = isSourceFileJS(file);
            if (isJSFile)
                return emptyArray;
            const functionDeclaration = getFunctionDeclarationAtPosition(file, startPosition, context.program.getTypeChecker());
            if (!functionDeclaration)
                return emptyArray;
            return [{
                    name: refactorName8,
                    description: refactorDescription4,
                    actions: [toDestructuredAction]
                }];
        }