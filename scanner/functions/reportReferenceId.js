function reportReferenceId(node) {
                /*
                 * For backward compatibility, if it's in callings then ignore it.
                 * Not sure why it is.
                 */
                if (node.parent.type === "CallExpression" ||
                    node.parent.type === "NewExpression") {
                    return;
                }
                /*
                 * For backward compatibility, if it's a default value of
                 * destructuring/parameters then ignore it.
                 * Not sure why it is.
                 */
                if (node.parent.type === "AssignmentPattern" &&
                    node.parent.right === node) {
                    return;
                }
                /*
                 * The `ignoreDestructuring` flag skips the identifiers that uses
                 * the property name as-is.
                 */
                if (ignoreDestructuring && equalsToOriginalName(node)) {
                    return;
                }
                report(node);
            }