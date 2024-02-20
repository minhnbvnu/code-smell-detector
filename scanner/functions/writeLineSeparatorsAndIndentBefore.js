function writeLineSeparatorsAndIndentBefore(node, parent2) {
                const leadingNewlines = preserveSourceNewlines && getLeadingLineTerminatorCount(parent2, node, 0 /* None */);
                if (leadingNewlines) {
                    writeLinesAndIndent(leadingNewlines, 
                    /*writeSpaceIfNotIndenting*/
                    false);
                }
                return !!leadingNewlines;
            }