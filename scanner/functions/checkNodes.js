function checkNodes(nodes) {
                if (!Array.isArray(nodes)) {
                    nodes = [nodes];
                }
                nodes.forEach(node => {
                    let lineNumber = sourceCode.getLine(node) - 1;

                    if (lineNumber > lastLine && lines[lineNumber].length > maxLineLength) {
                        context.report({
                            node,
                            message: `Line exceeds the limit of ${maxLineLength} characters`
                        });

                        lastLine = lineNumber;
                    }

                    checkNodes(node.body || []);
                });
            }