function isArgBeforeCalleeNodeMultiline(node) {
                const parent = node.parent;
                if (parent.arguments.length >= 2 && parent.arguments[1] === node) {
                    return parent.arguments[0].loc.end.line > parent.arguments[0].loc.start.line;
                }
                return false;
            }