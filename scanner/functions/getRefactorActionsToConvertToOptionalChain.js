function getRefactorActionsToConvertToOptionalChain(context) {
            const info = getInfo20(context, context.triggerReason === "invoked");
            if (!info)
                return emptyArray;
            if (!isRefactorErrorInfo(info)) {
                return [{
                        name: refactorName10,
                        description: convertToOptionalChainExpressionMessage,
                        actions: [toOptionalChainAction]
                    }];
            }
            if (context.preferences.provideRefactorNotApplicableReason) {
                return [{
                        name: refactorName10,
                        description: convertToOptionalChainExpressionMessage,
                        actions: [{ ...toOptionalChainAction, notApplicableReason: info.error }]
                    }];
            }
            return emptyArray;
        }