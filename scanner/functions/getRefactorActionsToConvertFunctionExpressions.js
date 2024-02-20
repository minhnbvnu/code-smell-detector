function getRefactorActionsToConvertFunctionExpressions(context) {
            const { file, startPosition, program, kind } = context;
            const info = getFunctionInfo(file, startPosition, program);
            if (!info)
                return emptyArray;
            const { selectedVariableDeclaration, func } = info;
            const possibleActions = [];
            const errors = [];
            if (refactorKindBeginsWith(toNamedFunctionAction.kind, kind)) {
                const error = selectedVariableDeclaration || isArrowFunction(func) && isVariableDeclaration(func.parent) ? void 0 : getLocaleSpecificMessage(Diagnostics.Could_not_convert_to_named_function);
                if (error) {
                    errors.push({ ...toNamedFunctionAction, notApplicableReason: error });
                }
                else {
                    possibleActions.push(toNamedFunctionAction);
                }
            }
            if (refactorKindBeginsWith(toAnonymousFunctionAction.kind, kind)) {
                const error = !selectedVariableDeclaration && isArrowFunction(func) ? void 0 : getLocaleSpecificMessage(Diagnostics.Could_not_convert_to_anonymous_function);
                if (error) {
                    errors.push({ ...toAnonymousFunctionAction, notApplicableReason: error });
                }
                else {
                    possibleActions.push(toAnonymousFunctionAction);
                }
            }
            if (refactorKindBeginsWith(toArrowFunctionAction.kind, kind)) {
                const error = isFunctionExpression(func) ? void 0 : getLocaleSpecificMessage(Diagnostics.Could_not_convert_to_arrow_function);
                if (error) {
                    errors.push({ ...toArrowFunctionAction, notApplicableReason: error });
                }
                else {
                    possibleActions.push(toArrowFunctionAction);
                }
            }
            return [{
                    name: refactorName7,
                    description: refactorDescription3,
                    actions: possibleActions.length === 0 && context.preferences.provideRefactorNotApplicableReason ? errors : possibleActions
                }];
        }