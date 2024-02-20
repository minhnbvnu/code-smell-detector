function checkSwitchStatement(node) {
                if (isNaNIdentifier(node.discriminant)) {
                    context.report({ node, messageId: "switchNaN" });
                }
                for (const switchCase of node.cases) {
                    if (isNaNIdentifier(switchCase.test)) {
                        context.report({ node: switchCase, messageId: "caseNaN" });
                    }
                }
            }