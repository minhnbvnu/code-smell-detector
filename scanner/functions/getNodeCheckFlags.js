function getNodeCheckFlags(node) {
                var _a2;
                const nodeId = node.id || 0;
                if (nodeId < 0 || nodeId >= nodeLinks.length)
                    return 0;
                return ((_a2 = nodeLinks[nodeId]) == null ? void 0 : _a2.flags) || 0;
            }