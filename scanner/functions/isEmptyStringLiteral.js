function isEmptyStringLiteral(node) {
            if (node.textSourceNode) {
                switch (node.textSourceNode.kind) {
                    case 10 /* StringLiteral */:
                        return isEmptyStringLiteral(node.textSourceNode);
                    case 14 /* NoSubstitutionTemplateLiteral */:
                        return node.text === "";
                }
                return false;
            }
            return node.text === "";
        }