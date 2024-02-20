function testValidTemplate(item) {
                const code = typeof item === "object" ? item.code : item;
                assert.ok(typeof code === "string", "Test case must specify a string value for 'code'");
                if (item.name) {
                    assert.ok(typeof item.name === "string", "Optional test case property 'name' must be a string");
                }
                const result = runRuleForItem(item);
                const messages = result.messages;
                assert.strictEqual(messages.length, 0, util.format("Should have no errors but had %d: %s", messages.length, util.inspect(messages)));
                assertASTDidntChange(result.beforeAST, result.afterAST);
            }