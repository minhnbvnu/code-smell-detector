function checkNumericLiteralValueSize(node) {
                const isFractional = getTextOfNode(node).indexOf(".") !== -1;
                const isScientific = node.numericLiteralFlags & 16 /* Scientific */;
                if (isFractional || isScientific) {
                    return;
                }
                const value = +node.text;
                if (value <= 2 ** 53 - 1) {
                    return;
                }
                addErrorOrSuggestion(
                /*isError*/
                false, createDiagnosticForNode(node, Diagnostics.Numeric_literals_with_absolute_values_equal_to_2_53_or_greater_are_too_large_to_be_represented_accurately_as_integers));
            }