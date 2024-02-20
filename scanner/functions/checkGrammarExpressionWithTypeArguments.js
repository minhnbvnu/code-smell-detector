function checkGrammarExpressionWithTypeArguments(node) {
                if (isExpressionWithTypeArguments(node) && isImportKeyword(node.expression) && node.typeArguments) {
                    return grammarErrorOnNode(node, Diagnostics.This_use_of_import_is_invalid_import_calls_can_be_written_but_they_must_have_parentheses_and_cannot_have_type_arguments);
                }
                return checkGrammarTypeArguments(node, node.typeArguments);
            }