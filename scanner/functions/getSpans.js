function getSpans(n) {
            const spans = [getNodeSpan(n.node)];
            if (n.additionalNodes) {
                for (const node of n.additionalNodes) {
                    spans.push(getNodeSpan(node));
                }
            }
            return spans;
        }