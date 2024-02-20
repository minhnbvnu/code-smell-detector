function runRules(sourceCode, configuredRules, ruleMapper, parserName, languageOptions, settings, filename, disableFixes, cwd, physicalFilename) {
        const emitter = createEmitter();
        const nodeQueue = [];
        let currentNode = sourceCode.ast;
        Traverser.traverse(sourceCode.ast, {
            enter(node, parent) {
                node.parent = parent;
                nodeQueue.push({ isEntering: true, node });
            },
            leave(node) {
                nodeQueue.push({ isEntering: false, node });
            },
            visitorKeys: sourceCode.visitorKeys
        });
        /*
         * Create a frozen object with the ruleContext properties and methods that are shared by all rules.
         * All rule contexts will inherit from this object. This avoids the performance penalty of copying all the
         * properties once for each rule.
         */
        const sharedTraversalContext = Object.freeze(Object.assign(Object.create(BASE_TRAVERSAL_CONTEXT), {
            getAncestors: () => getAncestors(currentNode),
            getDeclaredVariables: sourceCode.scopeManager.getDeclaredVariables.bind(sourceCode.scopeManager),
            getCwd: () => cwd,
            getFilename: () => filename,
            getPhysicalFilename: () => physicalFilename || filename,
            getScope: () => getScope(sourceCode.scopeManager, currentNode),
            getSourceCode: () => sourceCode,
            markVariableAsUsed: name => markVariableAsUsed(sourceCode.scopeManager, currentNode, languageOptions, name),
            parserOptions: {
                ...languageOptions.parserOptions
            },
            parserPath: parserName,
            languageOptions,
            parserServices: sourceCode.parserServices,
            settings
        }));
        const lintingProblems = [];
        Object.keys(configuredRules).forEach(ruleId => {
            const severity = ConfigOps.getRuleSeverity(configuredRules[ruleId]);
            // not load disabled rules
            if (severity === 0) {
                return;
            }
            const rule = ruleMapper(ruleId);
            if (!rule) {
                lintingProblems.push(createLintingProblem({ ruleId }));
                return;
            }
            const messageIds = rule.meta && rule.meta.messages;
            let reportTranslator = null;
            const ruleContext = Object.freeze(Object.assign(Object.create(sharedTraversalContext), {
                id: ruleId,
                options: getRuleOptions(configuredRules[ruleId]),
                report(...args) {
                    /*
                     * Create a report translator lazily.
                     * In a vast majority of cases, any given rule reports zero errors on a given
                     * piece of code. Creating a translator lazily avoids the performance cost of
                     * creating a new translator function for each rule that usually doesn't get
                     * called.
                     *
                     * Using lazy report translators improves end-to-end performance by about 3%
                     * with Node 8.4.0.
                     */
                    if (reportTranslator === null) {
                        reportTranslator = createReportTranslator({
                            ruleId,
                            severity,
                            sourceCode,
                            messageIds,
                            disableFixes
                        });
                    }
                    const problem = reportTranslator(...args);
                    if (problem.fix && !(rule.meta && rule.meta.fixable)) {
                        throw new Error("Fixable rules must set the `meta.fixable` property to \"code\" or \"whitespace\".");
                    }
                    if (problem.suggestions && !(rule.meta && rule.meta.hasSuggestions === true)) {
                        if (rule.meta && rule.meta.docs && typeof rule.meta.docs.suggestion !== "undefined") {
                            // Encourage migration from the former property name.
                            throw new Error("Rules with suggestions must set the `meta.hasSuggestions` property to `true`. `meta.docs.suggestion` is ignored by ESLint.");
                        }
                        throw new Error("Rules with suggestions must set the `meta.hasSuggestions` property to `true`.");
                    }
                    lintingProblems.push(problem);
                }
            }));
            const ruleListeners = timing.enabled ? timing.time(ruleId, createRuleListeners)(rule, ruleContext) : createRuleListeners(rule, ruleContext);
            /**
             * Include `ruleId` in error logs
             * @param {Function} ruleListener A rule method that listens for a node.
             * @returns {Function} ruleListener wrapped in error handler
             */
            function addRuleErrorHandler(ruleListener) {
                return function ruleErrorHandler(...listenerArgs) {
                    try {
                        return ruleListener(...listenerArgs);
                    }
                    catch (e) {
                        e.ruleId = ruleId;
                        throw e;
                    }
                };
            }
            if (typeof ruleListeners === "undefined" || ruleListeners === null) {
                throw new Error(`The create() function for rule '${ruleId}' did not return an object.`);
            }
            // add all the selectors from the rule as listeners
            Object.keys(ruleListeners).forEach(selector => {
                const ruleListener = timing.enabled
                    ? timing.time(ruleId, ruleListeners[selector])
                    : ruleListeners[selector];
                emitter.on(selector, addRuleErrorHandler(ruleListener));
            });
        });
        // only run code path analyzer if the top level node is "Program", skip otherwise
        const eventGenerator = nodeQueue[0].node.type === "Program"
            ? new CodePathAnalyzer(new NodeEventGenerator(emitter, { visitorKeys: sourceCode.visitorKeys, fallback: Traverser.getKeys }))
            : new NodeEventGenerator(emitter, { visitorKeys: sourceCode.visitorKeys, fallback: Traverser.getKeys });
        nodeQueue.forEach(traversalInfo => {
            currentNode = traversalInfo.node;
            try {
                if (traversalInfo.isEntering) {
                    eventGenerator.enterNode(currentNode);
                }
                else {
                    eventGenerator.leaveNode(currentNode);
                }
            }
            catch (err) {
                err.currentNode = currentNode;
                throw err;
            }
        });
        return lintingProblems;
    }