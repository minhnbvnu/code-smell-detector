function runRuleForItem(item) {
                const configs = new FlatConfigArray(testerConfig, { baseConfig });
                /*
                 * Modify the returned config so that the parser is wrapped to catch
                 * access of the start/end properties. This method is called just
                 * once per code snippet being tested, so each test case gets a clean
                 * parser.
                 */
                configs[ConfigArraySymbol.finalizeConfig] = function (...args) {
                    // can't do super here :(
                    const proto = Object.getPrototypeOf(this);
                    const calculatedConfig = proto[ConfigArraySymbol.finalizeConfig].apply(this, args);
                    // wrap the parser to catch start/end property access
                    calculatedConfig.languageOptions.parser = wrapParser(calculatedConfig.languageOptions.parser);
                    return calculatedConfig;
                };
                let code, filename, output, beforeAST, afterAST;
                if (typeof item === "string") {
                    code = item;
                }
                else {
                    code = item.code;
                    /*
                     * Assumes everything on the item is a config except for the
                     * parameters used by this tester
                     */
                    const itemConfig = { ...item };
                    for (const parameter of RuleTesterParameters) {
                        delete itemConfig[parameter];
                    }
                    // wrap any parsers
                    if (itemConfig.languageOptions && itemConfig.languageOptions.parser) {
                        const parser = itemConfig.languageOptions.parser;
                        if (parser && typeof parser !== "object") {
                            throw new Error("Parser must be an object with a parse() or parseForESLint() method.");
                        }
                    }
                    /*
                     * Create the config object from the tester config and this item
                     * specific configurations.
                     */
                    configs.push(itemConfig);
                }
                if (item.filename) {
                    filename = item.filename;
                }
                let ruleConfig = 1;
                if (hasOwnProperty(item, "options")) {
                    assert(Array.isArray(item.options), "options must be an array");
                    ruleConfig = [1, ...item.options];
                }
                configs.push({
                    rules: {
                        [ruleId]: ruleConfig
                    }
                });
                const schema = getRuleOptionsSchema(rule);
                /*
                 * Setup AST getters.
                 * The goal is to check whether or not AST was modified when
                 * running the rule under test.
                 */
                configs.push({
                    plugins: {
                        "rule-tester": {
                            rules: {
                                "validate-ast": {
                                    create() {
                                        return {
                                            Program(node) {
                                                beforeAST = cloneDeeplyExcludesParent(node);
                                            },
                                            "Program:exit"(node) {
                                                afterAST = node;
                                            }
                                        };
                                    }
                                }
                            }
                        }
                    }
                });
                if (schema) {
                    ajv.validateSchema(schema);
                    if (ajv.errors) {
                        const errors = ajv.errors.map(error => {
                            const field = error.dataPath[0] === "." ? error.dataPath.slice(1) : error.dataPath;
                            return `\t${field}: ${error.message}`;
                        }).join("\n");
                        throw new Error([`Schema for rule ${ruleName} is invalid:`, errors]);
                    }
                    /*
                     * `ajv.validateSchema` checks for errors in the structure of the schema (by comparing the schema against a "meta-schema"),
                     * and it reports those errors individually. However, there are other types of schema errors that only occur when compiling
                     * the schema (e.g. using invalid defaults in a schema), and only one of these errors can be reported at a time. As a result,
                     * the schema is compiled here separately from checking for `validateSchema` errors.
                     */
                    try {
                        ajv.compile(schema);
                    }
                    catch (err) {
                        throw new Error(`Schema for rule ${ruleName} is invalid: ${err.message}`);
                    }
                }
                // Verify the code.
                const { getComments } = SourceCode.prototype;
                let messages;
                // check for validation errors
                try {
                    configs.normalizeSync();
                    configs.getConfig("test.js");
                }
                catch (error) {
                    error.message = `ESLint configuration in rule-tester is invalid: ${error.message}`;
                    throw error;
                }
                try {
                    SourceCode.prototype.getComments = getCommentsDeprecation;
                    messages = linter.verify(code, configs, filename);
                }
                finally {
                    SourceCode.prototype.getComments = getComments;
                }
                const fatalErrorMessage = messages.find(m => m.fatal);
                assert(!fatalErrorMessage, `A fatal parsing error occurred: ${fatalErrorMessage && fatalErrorMessage.message}`);
                // Verify if autofix makes a syntax error or not.
                if (messages.some(m => m.fix)) {
                    output = SourceCodeFixer.applyFixes(code, messages).output;
                    const errorMessageInFix = linter.verify(output, configs, filename).find(m => m.fatal);
                    assert(!errorMessageInFix, [
                        "A fatal parsing error occurred in autofix.",
                        `Error: ${errorMessageInFix && errorMessageInFix.message}`,
                        "Autofix output:",
                        output
                    ].join("\n"));
                }
                else {
                    output = code;
                }
                return {
                    messages,
                    output,
                    beforeAST,
                    afterAST: cloneDeeplyExcludesParent(afterAST)
                };
            }