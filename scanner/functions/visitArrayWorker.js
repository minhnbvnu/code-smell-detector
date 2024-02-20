function visitArrayWorker(nodes, visitor, test, start, count) {
            let updated;
            const length2 = nodes.length;
            if (start > 0 || count < length2) {
                updated = [];
            }
            for (let i = 0; i < count; i++) {
                const node = nodes[i + start];
                const visited = node !== void 0 ? visitor ? visitor(node) : node : void 0;
                if (updated !== void 0 || visited === void 0 || visited !== node) {
                    if (updated === void 0) {
                        updated = nodes.slice(0, i);
                        Debug.assertEachNode(updated, test);
                    }
                    if (visited) {
                        if (isArray(visited)) {
                            for (const visitedNode of visited) {
                                Debug.assertNode(visitedNode, test);
                                updated.push(visitedNode);
                            }
                        }
                        else {
                            Debug.assertNode(visited, test);
                            updated.push(visited);
                        }
                    }
                }
            }
            if (updated) {
                return updated;
            }
            Debug.assertEachNode(nodes, test);
            return nodes;
        }