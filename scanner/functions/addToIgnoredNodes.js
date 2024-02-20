function addToIgnoredNodes(node) {
                ignoredNodes.add(node);
                ignoredNodeFirstTokens.add(sourceCode.getFirstToken(node));
            }