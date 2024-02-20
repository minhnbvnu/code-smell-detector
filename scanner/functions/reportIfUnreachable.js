function reportIfUnreachable(node) {
                let nextNode = null;
                if (node && (node.type === "PropertyDefinition" || currentCodePath.currentSegments.every(isUnreachable))) {
                    // Store this statement to distinguish consecutive statements.
                    if (range.isEmpty) {
                        range.reset(node);
                        return;
                    }
                    // Skip if this statement is inside of the current range.
                    if (range.contains(node)) {
                        return;
                    }
                    // Merge if this statement is consecutive to the current range.
                    if (range.isConsecutive(node)) {
                        range.merge(node);
                        return;
                    }
                    nextNode = node;
                }
                /*
                 * Report the current range since this statement is reachable or is
                 * not consecutive to the current range.
                 */
                if (!range.isEmpty) {
                    context.report({
                        messageId: "unreachableCode",
                        loc: range.location,
                        node: range.startNode
                    });
                }
                // Update the current range.
                range.reset(nextNode);
            }