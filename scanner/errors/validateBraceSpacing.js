function validateBraceSpacing(node, first, second, penultimate, last) {
                if ((0, util_1.isTokenOnSameLine)(first, second)) {
                    const firstSpaced = sourceCode.isSpaceBetween(first, second);
                    const secondType = sourceCode.getNodeByRangeIndex(second.range[0]).type;
                    const openingCurlyBraceMustBeSpaced = options.arraysInObjectsException &&
                        [
                            utils_1.AST_NODE_TYPES.TSMappedType,
                            utils_1.AST_NODE_TYPES.TSIndexSignature,
                        ].includes(secondType)
                        ? !options.spaced
                        : options.spaced;
                    if (openingCurlyBraceMustBeSpaced && !firstSpaced) {
                        reportRequiredBeginningSpace(node, first);
                    }
                    if (!openingCurlyBraceMustBeSpaced &&
                        firstSpaced &&
                        second.type !== utils_1.AST_TOKEN_TYPES.Line) {
                        reportNoBeginningSpace(node, first);
                    }
                }
                if ((0, util_1.isTokenOnSameLine)(penultimate, last)) {
                    const shouldCheckPenultimate = (options.arraysInObjectsException &&
                        (0, util_1.isClosingBracketToken)(penultimate)) ||
                        (options.objectsInObjectsException &&
                            (0, util_1.isClosingBraceToken)(penultimate));
                    const penultimateType = shouldCheckPenultimate
                        ? sourceCode.getNodeByRangeIndex(penultimate.range[0]).type
                        : undefined;
                    const closingCurlyBraceMustBeSpaced = (options.arraysInObjectsException &&
                        penultimateType === utils_1.AST_NODE_TYPES.TSTupleType) ||
                        (options.objectsInObjectsException &&
                            penultimateType !== undefined &&
                            [
                                utils_1.AST_NODE_TYPES.TSMappedType,
                                utils_1.AST_NODE_TYPES.TSTypeLiteral,
                            ].includes(penultimateType))
                        ? !options.spaced
                        : options.spaced;
                    const lastSpaced = sourceCode.isSpaceBetween(penultimate, last);
                    if (closingCurlyBraceMustBeSpaced && !lastSpaced) {
                        reportRequiredEndingSpace(node, last);
                    }
                    if (!closingCurlyBraceMustBeSpaced && lastSpaced) {
                        reportNoEndingSpace(node, last);
                    }
                }
            }