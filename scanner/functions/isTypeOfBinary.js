function isTypeOfBinary(node) {
                return isTypeOf(node.left) || isTypeOf(node.right);
            }