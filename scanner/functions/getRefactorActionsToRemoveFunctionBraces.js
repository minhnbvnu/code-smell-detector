function getRefactorActionsToRemoveFunctionBraces(context) {
            const { file, startPosition, triggerReason } = context;
            const info = getConvertibleArrowFunctionAtPosition(file, startPosition, triggerReason === "invoked");
            if (!info)
                return emptyArray;
            if (!isRefactorErrorInfo(info)) {
                return [{
                        name: refactorName6,
                        description: refactorDescription2,
                        actions: [
                            info.addBraces ? addBracesAction : removeBracesAction
                        ]
                    }];
            }
            if (context.preferences.provideRefactorNotApplicableReason) {
                return [{
                        name: refactorName6,
                        description: refactorDescription2,
                        actions: [
                            { ...addBracesAction, notApplicableReason: info.error },
                            { ...removeBracesAction, notApplicableReason: info.error }
                        ]
                    }];
            }
            return emptyArray;
        }