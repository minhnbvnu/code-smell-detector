function checkTypeReferenceNode(node) {
                checkGrammarTypeArguments(node, node.typeArguments);
                if (node.kind === 180 /* TypeReference */ && !isInJSFile(node) && !isInJSDoc(node) && node.typeArguments && node.typeName.end !== node.typeArguments.pos) {
                    const sourceFile = getSourceFileOfNode(node);
                    if (scanTokenAtPosition(sourceFile, node.typeName.end) === 24 /* DotToken */) {
                        grammarErrorAtPos(node, skipTrivia(sourceFile.text, node.typeName.end), 1, Diagnostics.JSDoc_types_can_only_be_used_inside_documentation_comments);
                    }
                }
                forEach(node.typeArguments, checkSourceElement);
                checkTypeReferenceOrImport(node);
            }