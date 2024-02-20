function collectChildren(node) {
            current.children.push({
                node,
                parent: current,
                kind: node.kind,
                children: [],
                next: undefined,
                skip: undefined,
            });
        }