function inferTypeFromCallExpression(parent2, usage) {
                const call = {
                    argumentTypes: [],
                    return_: createEmptyUsage()
                };
                if (parent2.arguments) {
                    for (const argument of parent2.arguments) {
                        call.argumentTypes.push(checker.getTypeAtLocation(argument));
                    }
                }
                calculateUsageOfNode(parent2, call.return_);
                if (parent2.kind === 210 /* CallExpression */) {
                    (usage.calls || (usage.calls = [])).push(call);
                }
                else {
                    (usage.constructs || (usage.constructs = [])).push(call);
                }
            }