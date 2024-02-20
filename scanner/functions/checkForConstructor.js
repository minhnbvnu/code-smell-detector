function checkForConstructor(node) {
                if (node.kind !== "constructor") {
                    return;
                }
                /*
                 * Prevent crashing on parsers which do not require class constructor
                 * to have a body, e.g. typescript and flow
                 */
                if (!node.value.body) {
                    return;
                }
                const body = node.value.body.body;
                const ctorParams = node.value.params;
                const superClass = node.parent.parent.superClass;
                if (superClass ? isRedundantSuperCall(body, ctorParams) : (body.length === 0)) {
                    context.report({
                        node,
                        messageId: "noUselessConstructor"
                    });
                }
            }