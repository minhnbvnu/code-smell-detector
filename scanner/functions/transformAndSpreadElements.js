function transformAndSpreadElements(elements, isArgumentList, multiLine, hasTrailingComma) {
                const numElements = elements.length;
                const segments = flatten(
                // As we visit each element, we return one of two functions to use as the "key":
                // - `visitSpanOfSpreads` for one or more contiguous `...` spread expressions, i.e. `...a, ...b` in `[1, 2, ...a, ...b]`
                // - `visitSpanOfNonSpreads` for one or more contiguous non-spread elements, i.e. `1, 2`, in `[1, 2, ...a, ...b]`
                spanMap(elements, partitionSpread, (partition, visitPartition, _start, end) => visitPartition(partition, multiLine, hasTrailingComma && end === numElements)));
                if (segments.length === 1) {
                    const firstSegment = segments[0];
                    if (isArgumentList && !compilerOptions.downlevelIteration || isPackedArrayLiteral(firstSegment.expression) || isCallToHelper(firstSegment.expression, "___spreadArray")) {
                        return firstSegment.expression;
                    }
                }
                const helpers = emitHelpers();
                const startsWithSpread = segments[0].kind !== 0 /* None */;
                let expression = startsWithSpread ? factory2.createArrayLiteralExpression() : segments[0].expression;
                for (let i = startsWithSpread ? 0 : 1; i < segments.length; i++) {
                    const segment = segments[i];
                    expression = helpers.createSpreadArrayHelper(expression, segment.expression, segment.kind === 1 /* UnpackedSpread */ && !isArgumentList);
                }
                return expression;
            }