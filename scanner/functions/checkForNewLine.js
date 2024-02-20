function checkForNewLine(node) {
                if (isForTypeSpecifier(node.parent.type)) {
                    return;
                }
                const declarations = node.declarations;
                let prev;
                declarations.forEach(current => {
                    if (prev && prev.loc.end.line === current.loc.start.line) {
                        if (always || prev.init || current.init) {
                            context.report({
                                node,
                                messageId: "expectVarOnNewline",
                                loc: current.loc,
                                fix: fixer => fixer.insertTextBefore(current, "\n")
                            });
                        }
                    }
                    prev = current;
                });
            }