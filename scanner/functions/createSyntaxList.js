function createSyntaxList(nodes, parent2) {
            const list = createNode(354 /* SyntaxList */, nodes.pos, nodes.end, parent2);
            list._children = [];
            let pos = nodes.pos;
            for (const node of nodes) {
                addSyntheticNodes(list._children, pos, node.pos, parent2);
                list._children.push(node);
                pos = node.end;
            }
            addSyntheticNodes(list._children, pos, nodes.end, parent2);
            return list;
        }