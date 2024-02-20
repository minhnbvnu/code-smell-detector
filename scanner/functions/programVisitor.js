function programVisitor(types, sourceFilePath = 'unknown.js', opts = {}) {
    const T = types;
    opts = {
        ...defaults.instrumentVisitor,
        ...opts
    };
    const visitState = new VisitState(
        types,
        sourceFilePath,
        opts.inputSourceMap,
        opts.ignoreClassMethods,
        opts.reportLogic
    );
    return {
        enter(path) {
            if (shouldIgnoreFile(path.find(p => p.isProgram()))) {
                return;
            }
            if (alreadyInstrumented(path, visitState)) {
                return;
            }
            path.traverse(codeVisitor, visitState);
        },
        exit(path) {
            if (alreadyInstrumented(path, visitState)) {
                return;
            }
            visitState.cov.freeze();
            const coverageData = visitState.cov.toJSON();
            if (shouldIgnoreFile(path.find(p => p.isProgram()))) {
                return {
                    fileCoverage: coverageData,
                    sourceMappingURL: visitState.sourceMappingURL
                };
            }
            coverageData[MAGIC_KEY] = MAGIC_VALUE;
            const hash = createHash(SHA)
                .update(JSON.stringify(coverageData))
                .digest('hex');
            coverageData.hash = hash;
            if (
                coverageData.inputSourceMap &&
                Object.getPrototypeOf(coverageData.inputSourceMap) !==
                    Object.prototype
            ) {
                coverageData.inputSourceMap = {
                    ...coverageData.inputSourceMap
                };
            }
            const coverageNode = T.valueToNode(coverageData);
            delete coverageData[MAGIC_KEY];
            delete coverageData.hash;
            let gvTemplate;
            if (opts.coverageGlobalScopeFunc) {
                if (path.scope.getBinding('Function')) {
                    gvTemplate = globalTemplateAlteredFunction({
                        GLOBAL_COVERAGE_SCOPE: T.stringLiteral(
                            'return ' + opts.coverageGlobalScope
                        )
                    });
                } else {
                    gvTemplate = globalTemplateFunction({
                        GLOBAL_COVERAGE_SCOPE: T.stringLiteral(
                            'return ' + opts.coverageGlobalScope
                        )
                    });
                }
            } else {
                gvTemplate = globalTemplateVariable({
                    GLOBAL_COVERAGE_SCOPE: opts.coverageGlobalScope
                });
            }
            const cv = coverageTemplate({
                GLOBAL_COVERAGE_VAR: T.stringLiteral(opts.coverageVariable),
                GLOBAL_COVERAGE_TEMPLATE: gvTemplate,
                COVERAGE_FUNCTION: T.identifier(visitState.varName),
                PATH: T.stringLiteral(sourceFilePath),
                INITIAL: coverageNode,
                HASH: T.stringLiteral(hash)
            });
            // explicitly call this.varName to ensure coverage is always initialized
            path.node.body.unshift(
                T.expressionStatement(
                    T.callExpression(T.identifier(visitState.varName), [])
                )
            );
            path.node.body.unshift(cv);
            return {
                fileCoverage: coverageData,
                sourceMappingURL: visitState.sourceMappingURL
            };
        }
    };
}