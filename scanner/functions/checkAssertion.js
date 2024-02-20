function checkAssertion(node) {
                if (node.kind === 213 /* TypeAssertionExpression */) {
                    const file = getSourceFileOfNode(node);
                    if (file && fileExtensionIsOneOf(file.fileName, [".cts" /* Cts */, ".mts" /* Mts */])) {
                        grammarErrorOnNode(node, Diagnostics.This_syntax_is_reserved_in_files_with_the_mts_or_cts_extension_Use_an_as_expression_instead);
                    }
                }
                return checkAssertionWorker(node, node.type, node.expression);
            }