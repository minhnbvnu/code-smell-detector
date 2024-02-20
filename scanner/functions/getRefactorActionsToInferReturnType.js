function getRefactorActionsToInferReturnType(context) {
            const info = getInfo21(context);
            if (!info)
                return emptyArray;
            if (!isRefactorErrorInfo(info)) {
                return [{
                        name: refactorName12,
                        description: refactorDescription6,
                        actions: [inferReturnTypeAction]
                    }];
            }
            if (context.preferences.provideRefactorNotApplicableReason) {
                return [{
                        name: refactorName12,
                        description: refactorDescription6,
                        actions: [{ ...inferReturnTypeAction, notApplicableReason: info.error }]
                    }];
            }
            return emptyArray;
        }