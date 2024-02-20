function checkRejectCall(callExpression) {
                if (!callExpression.arguments.length && ALLOW_EMPTY_REJECT) {
                    return;
                }
                if (!callExpression.arguments.length ||
                    !astUtils.couldBeError(callExpression.arguments[0]) ||
                    callExpression.arguments[0].type === "Identifier" && callExpression.arguments[0].name === "undefined") {
                    context.report({
                        node: callExpression,
                        messageId: "rejectAnError"
                    });
                }
            }