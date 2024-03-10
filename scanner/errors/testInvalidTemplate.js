function testInvalidTemplate(item) {
                assert.ok(typeof item.code === "string", "Test case must specify a string value for 'code'");
                if (item.name) {
                    assert.ok(typeof item.name === "string", "Optional test case property 'name' must be a string");
                }
                assert.ok(item.errors || item.errors === 0, `Did not specify errors for an invalid test of ${ruleName}`);
                if (Array.isArray(item.errors) && item.errors.length === 0) {
                    assert.fail("Invalid cases must have at least one error");
                }
                const ruleHasMetaMessages = hasOwnProperty(rule, "meta") && hasOwnProperty(rule.meta, "messages");
                const friendlyIDList = ruleHasMetaMessages ? `[${Object.keys(rule.meta.messages).map(key => `'${key}'`).join(", ")}]` : null;
                const result = runRuleForItem(item);
                const messages = result.messages;
                if (typeof item.errors === "number") {
                    if (item.errors === 0) {
                        assert.fail("Invalid cases must have 'error' value greater than 0");
                    }
                    assert.strictEqual(messages.length, item.errors, util.format("Should have %d error%s but had %d: %s", item.errors, item.errors === 1 ? "" : "s", messages.length, util.inspect(messages)));
                }
                else {
                    assert.strictEqual(messages.length, item.errors.length, util.format("Should have %d error%s but had %d: %s", item.errors.length, item.errors.length === 1 ? "" : "s", messages.length, util.inspect(messages)));
                    const hasMessageOfThisRule = messages.some(m => m.ruleId === ruleId);
                    for (let i = 0, l = item.errors.length; i < l; i++) {
                        const error = item.errors[i];
                        const message = messages[i];
                        assert(hasMessageOfThisRule, "Error rule name should be the same as the name of the rule being tested");
                        if (typeof error === "string" || error instanceof RegExp) {
                            // Just an error message.
                            assertMessageMatches(message.message, error);
                        }
                        else if (typeof error === "object" && error !== null) {
                            /*
                             * Error object.
                             * This may have a message, messageId, data, node type, line, and/or
                             * column.
                             */
                            Object.keys(error).forEach(propertyName => {
                                assert.ok(errorObjectParameters.has(propertyName), `Invalid error property name '${propertyName}'. Expected one of ${friendlyErrorObjectParameterList}.`);
                            });
                            if (hasOwnProperty(error, "message")) {
                                assert.ok(!hasOwnProperty(error, "messageId"), "Error should not specify both 'message' and a 'messageId'.");
                                assert.ok(!hasOwnProperty(error, "data"), "Error should not specify both 'data' and 'message'.");
                                assertMessageMatches(message.message, error.message);
                            }
                            else if (hasOwnProperty(error, "messageId")) {
                                assert.ok(ruleHasMetaMessages, "Error can not use 'messageId' if rule under test doesn't define 'meta.messages'.");
                                if (!hasOwnProperty(rule.meta.messages, error.messageId)) {
                                    assert(false, `Invalid messageId '${error.messageId}'. Expected one of ${friendlyIDList}.`);
                                }
                                assert.strictEqual(message.messageId, error.messageId, `messageId '${message.messageId}' does not match expected messageId '${error.messageId}'.`);
                                if (hasOwnProperty(error, "data")) {
                                    /*
                                     *  if data was provided, then directly compare the returned message to a synthetic
                                     *  interpolated message using the same message ID and data provided in the test.
                                     *  See https://github.com/eslint/eslint/issues/9890 for context.
                                     */
                                    const unformattedOriginalMessage = rule.meta.messages[error.messageId];
                                    const rehydratedMessage = interpolate(unformattedOriginalMessage, error.data);
                                    assert.strictEqual(message.message, rehydratedMessage, `Hydrated message "${rehydratedMessage}" does not match "${message.message}"`);
                                }
                            }
                            assert.ok(hasOwnProperty(error, "data") ? hasOwnProperty(error, "messageId") : true, "Error must specify 'messageId' if 'data' is used.");
                            if (error.type) {
                                assert.strictEqual(message.nodeType, error.type, `Error type should be ${error.type}, found ${message.nodeType}`);
                            }
                            if (hasOwnProperty(error, "line")) {
                                assert.strictEqual(message.line, error.line, `Error line should be ${error.line}`);
                            }
                            if (hasOwnProperty(error, "column")) {
                                assert.strictEqual(message.column, error.column, `Error column should be ${error.column}`);
                            }
                            if (hasOwnProperty(error, "endLine")) {
                                assert.strictEqual(message.endLine, error.endLine, `Error endLine should be ${error.endLine}`);
                            }
                            if (hasOwnProperty(error, "endColumn")) {
                                assert.strictEqual(message.endColumn, error.endColumn, `Error endColumn should be ${error.endColumn}`);
                            }
                            if (hasOwnProperty(error, "suggestions")) {
                                // Support asserting there are no suggestions
                                if (!error.suggestions || (Array.isArray(error.suggestions) && error.suggestions.length === 0)) {
                                    if (Array.isArray(message.suggestions) && message.suggestions.length > 0) {
                                        assert.fail(`Error should have no suggestions on error with message: "${message.message}"`);
                                    }
                                }
                                else {
                                    assert.strictEqual(Array.isArray(message.suggestions), true, `Error should have an array of suggestions. Instead received "${message.suggestions}" on error with message: "${message.message}"`);
                                    assert.strictEqual(message.suggestions.length, error.suggestions.length, `Error should have ${error.suggestions.length} suggestions. Instead found ${message.suggestions.length} suggestions`);
                                    error.suggestions.forEach((expectedSuggestion, index) => {
                                        assert.ok(typeof expectedSuggestion === "object" && expectedSuggestion !== null, "Test suggestion in 'suggestions' array must be an object.");
                                        Object.keys(expectedSuggestion).forEach(propertyName => {
                                            assert.ok(suggestionObjectParameters.has(propertyName), `Invalid suggestion property name '${propertyName}'. Expected one of ${friendlySuggestionObjectParameterList}.`);
                                        });
                                        const actualSuggestion = message.suggestions[index];
                                        const suggestionPrefix = `Error Suggestion at index ${index} :`;
                                        if (hasOwnProperty(expectedSuggestion, "desc")) {
                                            assert.ok(!hasOwnProperty(expectedSuggestion, "data"), `${suggestionPrefix} Test should not specify both 'desc' and 'data'.`);
                                            assert.strictEqual(actualSuggestion.desc, expectedSuggestion.desc, `${suggestionPrefix} desc should be "${expectedSuggestion.desc}" but got "${actualSuggestion.desc}" instead.`);
                                        }
                                        if (hasOwnProperty(expectedSuggestion, "messageId")) {
                                            assert.ok(ruleHasMetaMessages, `${suggestionPrefix} Test can not use 'messageId' if rule under test doesn't define 'meta.messages'.`);
                                            assert.ok(hasOwnProperty(rule.meta.messages, expectedSuggestion.messageId), `${suggestionPrefix} Test has invalid messageId '${expectedSuggestion.messageId}', the rule under test allows only one of ${friendlyIDList}.`);
                                            assert.strictEqual(actualSuggestion.messageId, expectedSuggestion.messageId, `${suggestionPrefix} messageId should be '${expectedSuggestion.messageId}' but got '${actualSuggestion.messageId}' instead.`);
                                            if (hasOwnProperty(expectedSuggestion, "data")) {
                                                const unformattedMetaMessage = rule.meta.messages[expectedSuggestion.messageId];
                                                const rehydratedDesc = interpolate(unformattedMetaMessage, expectedSuggestion.data);
                                                assert.strictEqual(actualSuggestion.desc, rehydratedDesc, `${suggestionPrefix} Hydrated test desc "${rehydratedDesc}" does not match received desc "${actualSuggestion.desc}".`);
                                            }
                                        }
                                        else {
                                            assert.ok(!hasOwnProperty(expectedSuggestion, "data"), `${suggestionPrefix} Test must specify 'messageId' if 'data' is used.`);
                                        }
                                        if (hasOwnProperty(expectedSuggestion, "output")) {
                                            const codeWithAppliedSuggestion = SourceCodeFixer.applyFixes(item.code, [actualSuggestion]).output;
                                            assert.strictEqual(codeWithAppliedSuggestion, expectedSuggestion.output, `Expected the applied suggestion fix to match the test suggestion output for suggestion at index: ${index} on error with message: "${message.message}"`);
                                        }
                                    });
                                }
                            }
                        }
                        else {
                            // Message was an unexpected type
                            assert.fail(`Error should be a string, object, or RegExp, but found (${util.inspect(message)})`);
                        }
                    }
                }
                if (hasOwnProperty(item, "output")) {
                    if (item.output === null) {
                        assert.strictEqual(result.output, item.code, "Expected no autofixes to be suggested");
                    }
                    else {
                        assert.strictEqual(result.output, item.output, "Output is incorrect.");
                    }
                }
                else {
                    assert.strictEqual(result.output, item.code, "The rule fixed the code. Please add 'output' property.");
                }
                assertASTDidntChange(result.beforeAST, result.afterAST);
            }