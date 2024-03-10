function getRefactorActionsToExtractSymbol(context) {
            const requestedRefactor = context.kind;
            const rangeToExtract = getRangeToExtract2(context.file, getRefactorContextSpan(context), context.triggerReason === "invoked");
            const targetRange = rangeToExtract.targetRange;
            if (targetRange === void 0) {
                if (!rangeToExtract.errors || rangeToExtract.errors.length === 0 || !context.preferences.provideRefactorNotApplicableReason) {
                    return emptyArray;
                }
                const errors = [];
                if (refactorKindBeginsWith(extractFunctionAction.kind, requestedRefactor)) {
                    errors.push({
                        name: refactorName11,
                        description: extractFunctionAction.description,
                        actions: [{ ...extractFunctionAction, notApplicableReason: getStringError(rangeToExtract.errors) }]
                    });
                }
                if (refactorKindBeginsWith(extractConstantAction.kind, requestedRefactor)) {
                    errors.push({
                        name: refactorName11,
                        description: extractConstantAction.description,
                        actions: [{ ...extractConstantAction, notApplicableReason: getStringError(rangeToExtract.errors) }]
                    });
                }
                return errors;
            }
            const extractions = getPossibleExtractions(targetRange, context);
            if (extractions === void 0) {
                return emptyArray;
            }
            const functionActions = [];
            const usedFunctionNames = /* @__PURE__ */ new Map();
            let innermostErrorFunctionAction;
            const constantActions = [];
            const usedConstantNames = /* @__PURE__ */ new Map();
            let innermostErrorConstantAction;
            let i = 0;
            for (const { functionExtraction, constantExtraction } of extractions) {
                if (refactorKindBeginsWith(extractFunctionAction.kind, requestedRefactor)) {
                    const description2 = functionExtraction.description;
                    if (functionExtraction.errors.length === 0) {
                        if (!usedFunctionNames.has(description2)) {
                            usedFunctionNames.set(description2, true);
                            functionActions.push({
                                description: description2,
                                name: `function_scope_${i}`,
                                kind: extractFunctionAction.kind
                            });
                        }
                    }
                    else if (!innermostErrorFunctionAction) {
                        innermostErrorFunctionAction = {
                            description: description2,
                            name: `function_scope_${i}`,
                            notApplicableReason: getStringError(functionExtraction.errors),
                            kind: extractFunctionAction.kind
                        };
                    }
                }
                if (refactorKindBeginsWith(extractConstantAction.kind, requestedRefactor)) {
                    const description2 = constantExtraction.description;
                    if (constantExtraction.errors.length === 0) {
                        if (!usedConstantNames.has(description2)) {
                            usedConstantNames.set(description2, true);
                            constantActions.push({
                                description: description2,
                                name: `constant_scope_${i}`,
                                kind: extractConstantAction.kind
                            });
                        }
                    }
                    else if (!innermostErrorConstantAction) {
                        innermostErrorConstantAction = {
                            description: description2,
                            name: `constant_scope_${i}`,
                            notApplicableReason: getStringError(constantExtraction.errors),
                            kind: extractConstantAction.kind
                        };
                    }
                }
                i++;
            }
            const infos = [];
            if (functionActions.length) {
                infos.push({
                    name: refactorName11,
                    description: getLocaleSpecificMessage(Diagnostics.Extract_function),
                    actions: functionActions
                });
            }
            else if (context.preferences.provideRefactorNotApplicableReason && innermostErrorFunctionAction) {
                infos.push({
                    name: refactorName11,
                    description: getLocaleSpecificMessage(Diagnostics.Extract_function),
                    actions: [innermostErrorFunctionAction]
                });
            }
            if (constantActions.length) {
                infos.push({
                    name: refactorName11,
                    description: getLocaleSpecificMessage(Diagnostics.Extract_constant),
                    actions: constantActions
                });
            }
            else if (context.preferences.provideRefactorNotApplicableReason && innermostErrorConstantAction) {
                infos.push({
                    name: refactorName11,
                    description: getLocaleSpecificMessage(Diagnostics.Extract_constant),
                    actions: [innermostErrorConstantAction]
                });
            }
            return infos.length ? infos : emptyArray;
            function getStringError(errors) {
                let error = errors[0].messageText;
                if (typeof error !== "string") {
                    error = error.messageText;
                }
                return error;
            }
        }