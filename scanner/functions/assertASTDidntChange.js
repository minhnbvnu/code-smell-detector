function assertASTDidntChange(beforeAST, afterAST) {
                if (!equal(beforeAST, afterAST)) {
                    assert.fail("Rule should not modify AST.");
                }
            }