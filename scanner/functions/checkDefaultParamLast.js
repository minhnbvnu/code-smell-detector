function checkDefaultParamLast(node) {
                let hasSeenPlainParam = false;
                for (let i = node.params.length - 1; i >= 0; i--) {
                    const current = node.params[i];
                    const param = current.type === utils_1.AST_NODE_TYPES.TSParameterProperty
                        ? current.parameter
                        : current;
                    if (isPlainParam(param)) {
                        hasSeenPlainParam = true;
                        continue;
                    }
                    if (hasSeenPlainParam &&
                        (isOptionalParam(param) ||
                            param.type === utils_1.AST_NODE_TYPES.AssignmentPattern)) {
                        context.report({ node: current, messageId: 'shouldBeLast' });
                    }
                }
            }