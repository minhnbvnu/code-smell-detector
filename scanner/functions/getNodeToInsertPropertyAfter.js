function getNodeToInsertPropertyAfter(node) {
            let res;
            for (const member of node.members) {
                if (!isPropertyDeclaration(member))
                    break;
                res = member;
            }
            return res;
        }