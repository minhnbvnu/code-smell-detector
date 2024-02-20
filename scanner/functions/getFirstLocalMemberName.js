function getFirstLocalMemberName(node) {
                if (node.specifiers[0]) {
                    return node.specifiers[0].local.name;
                }
                return null;
            }