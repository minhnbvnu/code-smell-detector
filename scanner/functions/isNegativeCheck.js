function isNegativeCheck(node) {
                switch (node.operator) {
                    case '===':
                    case '==':
                    case '<=':
                        return isNumber(node.right, -1);
                    case '<':
                        return isNumber(node.right, 0);
                    default:
                        return false;
                }
            }