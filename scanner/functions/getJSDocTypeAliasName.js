function getJSDocTypeAliasName(fullName) {
            if (fullName) {
                let rightNode = fullName;
                while (true) {
                    if (isIdentifier(rightNode) || !rightNode.body) {
                        return isIdentifier(rightNode) ? rightNode : rightNode.name;
                    }
                    rightNode = rightNode.body;
                }
            }
        }