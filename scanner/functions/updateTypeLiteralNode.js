function updateTypeLiteralNode(node, members) {
                return node.members !== members ? update(createTypeLiteralNode(members), node) : node;
            }