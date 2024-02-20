function getRefactorEditsToConvertToTemplateString(context, actionName2) {
            const { file, startPosition } = context;
            const node = getNodeOrParentOfParentheses(file, startPosition);
            switch (actionName2) {
                case refactorDescription5:
                    return { edits: getEditsForToTemplateLiteral(context, node) };
                default:
                    return Debug.fail("invalid action");
            }
        }