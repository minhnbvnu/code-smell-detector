function nodeSeenTracker() {
            const seen = [];
            return (node) => {
                const id = getNodeId(node);
                return !seen[id] && (seen[id] = true);
            };
        }