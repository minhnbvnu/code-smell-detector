function recordUsage(n, usage, isTypeNode2) {
                const symbolId = recordUsagebySymbol(n, usage, isTypeNode2);
                if (symbolId) {
                    for (let i = 0; i < scopes.length; i++) {
                        const substitution = substitutionsPerScope[i].get(symbolId);
                        if (substitution) {
                            usagesPerScope[i].substitutions.set(getNodeId(n).toString(), substitution);
                        }
                    }
                }
            }