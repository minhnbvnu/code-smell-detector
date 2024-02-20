function isZeroInitialized(node) {
                return node.init != null && isLiteral(node.init, 0);
            }