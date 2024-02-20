function hasSameParameters(nodeA, nodeB) {
                if (!ts.isFunctionLike(nodeA) || !ts.isFunctionLike(nodeB)) {
                    return false;
                }
                const paramsA = nodeA.parameters;
                const paramsB = nodeB.parameters;
                if (paramsA.length !== paramsB.length) {
                    return false;
                }
                for (let i = 0; i < paramsA.length; ++i) {
                    const paramA = paramsA[i];
                    const paramB = paramsB[i];
                    // Check name, type, and question token once.
                    if (paramA.getText() !== paramB.getText()) {
                        return false;
                    }
                }
                return true;
            }