function checkTestConditional(node) {
                if (node.test) {
                    checkConditional(node.test, true);
                }
            }