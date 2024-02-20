function startFunction(node) {
                fns.push({
                    returnPresent: (node.type === "ArrowFunctionExpression" && node.body.type !== "BlockStatement") ||
                        isTypeClass(node) || node.async
                });
            }