function checkGrammarForAtLeastOneTypeArgument(node, typeArguments) {
                if (typeArguments && typeArguments.length === 0) {
                    const sourceFile = getSourceFileOfNode(node);
                    const start = typeArguments.pos - "<".length;
                    const end = skipTrivia(sourceFile.text, typeArguments.end) + ">".length;
                    return grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.Type_argument_list_cannot_be_empty);
                }
                return false;
            }