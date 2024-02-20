function inspectPragmaStatement(emitted) {
            let node = emitted.node,
                sourceCode = context.getSourceCode(), pragmaParent = sourceCode.getParent(node);

            // If pragma statement is on top, exit now. No further checks required.
            if (emitted.exit || node.start === pragmaParent.body [0].start) {
                return;
            }

            const pragmaCode = sourceCode.getText(node);

            context.report({
                node: node,
                message: `"${pragmaCode}" should be at the top of the file.`,
                fix: function(fixer) {
                    return [fixer.remove(node),
                        fixer.insertTextBefore(pragmaParent.body [0], `${pragmaCode}${EOL}`)];
                }
            });

            missingNodeOnTopErrorReported = true;
        }