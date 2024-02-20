function getRefactorActionsToConvertToTemplateString(context) {
            const { file, startPosition } = context;
            const node = getNodeOrParentOfParentheses(file, startPosition);
            const maybeBinary = getParentBinaryExpression(node);
            const refactorInfo = { name: refactorName9, description: refactorDescription5, actions: [] };
            if (isBinaryExpression(maybeBinary) && treeToArray(maybeBinary).isValidConcatenation) {
                refactorInfo.actions.push(convertStringAction);
                return [refactorInfo];
            }
            else if (context.preferences.provideRefactorNotApplicableReason) {
                refactorInfo.actions.push({
                    ...convertStringAction,
                    notApplicableReason: getLocaleSpecificMessage(Diagnostics.Can_only_convert_string_concatenation)
                });
                return [refactorInfo];
            }
            return emptyArray;
        }