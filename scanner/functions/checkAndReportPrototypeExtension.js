function checkAndReportPrototypeExtension(identifierNode) {
                if (!isPrototypePropertyAccessed(identifierNode)) {
                    return; // This is not `*.prototype` access.
                }
                /*
                 * `identifierNode.parent` is a MemberExpression `*.prototype`.
                 * If it's an optional member access, it may be wrapped by a `ChainExpression` node.
                 */
                const prototypeNode = identifierNode.parent.parent.type === "ChainExpression"
                    ? identifierNode.parent.parent
                    : identifierNode.parent;
                if (isAssigningToPropertyOf(prototypeNode)) {
                    // `*.prototype` -> MemberExpression -> AssignmentExpression
                    reportNode(prototypeNode.parent.parent, identifierNode.name);
                }
                else if (isInDefinePropertyCall(prototypeNode)) {
                    // `*.prototype` -> CallExpression
                    reportNode(prototypeNode.parent, identifierNode.name);
                }
            }