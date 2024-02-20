function forEachChildRecursively(rootNode, cbNode, cbNodes) {
            const queue = gatherPossibleChildren(rootNode);
            const parents = [];
            while (parents.length < queue.length) {
                parents.push(rootNode);
            }
            while (queue.length !== 0) {
                const current = queue.pop();
                const parent2 = parents.pop();
                if (isArray(current)) {
                    if (cbNodes) {
                        const res = cbNodes(current, parent2);
                        if (res) {
                            if (res === "skip")
                                continue;
                            return res;
                        }
                    }
                    for (let i = current.length - 1; i >= 0; --i) {
                        queue.push(current[i]);
                        parents.push(parent2);
                    }
                }
                else {
                    const res = cbNode(current, parent2);
                    if (res) {
                        if (res === "skip")
                            continue;
                        return res;
                    }
                    if (current.kind >= 163 /* FirstNode */) {
                        for (const child of gatherPossibleChildren(current)) {
                            queue.push(child);
                            parents.push(current);
                        }
                    }
                }
            }
        }