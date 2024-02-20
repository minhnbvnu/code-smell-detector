function writeLineSeparatorsAfter(node, parent2) {
                const trailingNewlines = preserveSourceNewlines && getClosingLineTerminatorCount(parent2, node, 0 /* None */, 
                /*childrenTextRange*/
                void 0);
                if (trailingNewlines) {
                    writeLine(trailingNewlines);
                }
            }