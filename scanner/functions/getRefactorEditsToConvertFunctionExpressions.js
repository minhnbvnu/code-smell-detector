function getRefactorEditsToConvertFunctionExpressions(context, actionName2) {
            const { file, startPosition, program } = context;
            const info = getFunctionInfo(file, startPosition, program);
            if (!info)
                return void 0;
            const { func } = info;
            const edits = [];
            switch (actionName2) {
                case toAnonymousFunctionAction.name:
                    edits.push(...getEditInfoForConvertToAnonymousFunction(context, func));
                    break;
                case toNamedFunctionAction.name:
                    const variableInfo = getVariableInfo(func);
                    if (!variableInfo)
                        return void 0;
                    edits.push(...getEditInfoForConvertToNamedFunction(context, func, variableInfo));
                    break;
                case toArrowFunctionAction.name:
                    if (!isFunctionExpression(func))
                        return void 0;
                    edits.push(...getEditInfoForConvertToArrowFunction(context, func));
                    break;
                default:
                    return Debug.fail("invalid action");
            }
            return { renameFilename: void 0, renameLocation: void 0, edits };
        }