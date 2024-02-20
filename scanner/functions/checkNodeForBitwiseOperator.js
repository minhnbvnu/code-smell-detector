function checkNodeForBitwiseOperator(node) {
                if (hasBitwiseOperator(node) && !allowedOperator(node) && !isInt32Hint(node)) {
                    report(node);
                }
            }