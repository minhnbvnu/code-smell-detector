function getInfo20(context, considerEmptySpans = true) {
            const { file, program } = context;
            const span = getRefactorContextSpan(context);
            const forEmptySpan = span.length === 0;
            if (forEmptySpan && !considerEmptySpans)
                return void 0;
            const startToken = getTokenAtPosition(file, span.start);
            const endToken = findTokenOnLeftOfPosition(file, span.start + span.length);
            const adjustedSpan = createTextSpanFromBounds(startToken.pos, endToken && endToken.end >= startToken.pos ? endToken.getEnd() : startToken.getEnd());
            const parent2 = forEmptySpan ? getValidParentNodeOfEmptySpan(startToken) : getValidParentNodeContainingSpan(startToken, adjustedSpan);
            const expression = parent2 && isValidExpressionOrStatement(parent2) ? getExpression(parent2) : void 0;
            if (!expression)
                return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_convertible_access_expression) };
            const checker = program.getTypeChecker();
            return isConditionalExpression(expression) ? getConditionalInfo(expression, checker) : getBinaryInfo(expression);
        }