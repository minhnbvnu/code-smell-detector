function getRefactorEditsToExtractSymbol(context, actionName2) {
            const rangeToExtract = getRangeToExtract2(context.file, getRefactorContextSpan(context));
            const targetRange = rangeToExtract.targetRange;
            const parsedFunctionIndexMatch = /^function_scope_(\d+)$/.exec(actionName2);
            if (parsedFunctionIndexMatch) {
                const index = +parsedFunctionIndexMatch[1];
                Debug.assert(isFinite(index), "Expected to parse a finite number from the function scope index");
                return getFunctionExtractionAtIndex(targetRange, context, index);
            }
            const parsedConstantIndexMatch = /^constant_scope_(\d+)$/.exec(actionName2);
            if (parsedConstantIndexMatch) {
                const index = +parsedConstantIndexMatch[1];
                Debug.assert(isFinite(index), "Expected to parse a finite number from the constant scope index");
                return getConstantExtractionAtIndex(targetRange, context, index);
            }
            Debug.fail("Unrecognized action name");
        }