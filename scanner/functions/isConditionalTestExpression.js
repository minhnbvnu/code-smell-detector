function isConditionalTestExpression(node) {
                return node.parent &&
                    TEST_CONDITION_PARENT_TYPES.has(node.parent.type) &&
                    node === node.parent.test;
            }