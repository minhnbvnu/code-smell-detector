function checkIndentInVariableDeclarations(node) {
                const elements = filterOutSameLineVars(node);
                const nodeIndent = getNodeIndent(node).goodChar;
                const lastElement = elements[elements.length - 1];
                const elementsIndent = nodeIndent + indentSize * options.VariableDeclarator[node.kind];
                checkNodesIndent(elements, elementsIndent);
                // Only check the last line if there is any token after the last item
                if (sourceCode.getLastToken(node).loc.end.line <= lastElement.loc.end.line) {
                    return;
                }
                const tokenBeforeLastElement = sourceCode.getTokenBefore(lastElement);
                if (tokenBeforeLastElement.value === ",") {
                    // Special case for comma-first syntax where the semicolon is indented
                    checkLastNodeLineIndent(node, getNodeIndent(tokenBeforeLastElement).goodChar);
                }
                else {
                    checkLastNodeLineIndent(node, elementsIndent - indentSize);
                }
            }