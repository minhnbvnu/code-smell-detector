function createAccessorData(node) {
                const name = astUtils.getStaticPropertyName(node);
                const key = (name !== null) ? name : sourceCode.getTokens(node.key);
                return {
                    key,
                    getters: node.kind === "get" ? [node] : [],
                    setters: node.kind === "set" ? [node] : []
                };
            }