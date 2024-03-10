function parseAndGenerateServices(code, options) {
        var _a, _b;
        /**
         * Reset the parse configuration
         */
        const parseSettings = (0, createParseSettings_1.createParseSettings)(code, options);
        if (options !== undefined) {
            if (typeof options.errorOnTypeScriptSyntacticAndSemanticIssues ===
                'boolean' &&
                options.errorOnTypeScriptSyntacticAndSemanticIssues) {
                parseSettings.errorOnTypeScriptSyntacticAndSemanticIssues = true;
            }
        }
        /**
         * If this is a single run in which the user has not provided any existing programs but there
         * are programs which need to be created from the provided "project" option,
         * create an Iterable which will lazily create the programs as needed by the iteration logic
         */
        if (parseSettings.singleRun &&
            !parseSettings.programs &&
            ((_a = parseSettings.projects) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            parseSettings.programs = {
                *[Symbol.iterator]() {
                    for (const configFile of parseSettings.projects) {
                        const existingProgram = existingPrograms.get(configFile);
                        if (existingProgram) {
                            yield existingProgram;
                        }
                        else {
                            log('Detected single-run/CLI usage, creating Program once ahead of time for project: %s', configFile);
                            const newProgram = (0, useProvidedPrograms_1.createProgramFromConfigFile)(configFile);
                            existingPrograms.set(configFile, newProgram);
                            yield newProgram;
                        }
                    }
                },
            };
        }
        /**
         * Generate a full ts.Program or offer provided instances in order to be able to provide parser services, such as type-checking
         */
        const shouldProvideParserServices = parseSettings.programs != null || ((_b = parseSettings.projects) === null || _b === void 0 ? void 0 : _b.length) > 0;
        /**
         * If we are in singleRun mode but the parseAndGenerateServices() function has been called more than once for the current file,
         * it must mean that we are in the middle of an ESLint automated fix cycle (in which parsing can be performed up to an additional
         * 10 times in order to apply all possible fixes for the file).
         *
         * In this scenario we cannot rely upon the singleRun AOT compiled programs because the SourceFiles will not contain the source
         * with the latest fixes applied. Therefore we fallback to creating the quickest possible isolated program from the updated source.
         */
        if (parseSettings.singleRun && options.filePath) {
            parseAndGenerateServicesCalls[options.filePath] =
                (parseAndGenerateServicesCalls[options.filePath] || 0) + 1;
        }
        const { ast, program } = parseSettings.singleRun &&
            options.filePath &&
            parseAndGenerateServicesCalls[options.filePath] > 1
            ? (0, createIsolatedProgram_1.createIsolatedProgram)(parseSettings)
            : getProgramAndAST(parseSettings, shouldProvideParserServices);
        /**
         * Convert the TypeScript AST to an ESTree-compatible one, and optionally preserve
         * mappings between converted and original AST nodes
         */
        const shouldPreserveNodeMaps = typeof parseSettings.preserveNodeMaps === 'boolean'
            ? parseSettings.preserveNodeMaps
            : true;
        const { estree, astMaps } = (0, ast_converter_1.astConverter)(ast, parseSettings, shouldPreserveNodeMaps);
        /**
         * Even if TypeScript parsed the source code ok, and we had no problems converting the AST,
         * there may be other syntactic or semantic issues in the code that we can optionally report on.
         */
        if (program && parseSettings.errorOnTypeScriptSyntacticAndSemanticIssues) {
            const error = (0, semantic_or_syntactic_errors_1.getFirstSemanticOrSyntacticError)(program, ast);
            if (error) {
                throw (0, convert_1.convertError)(error);
            }
        }
        /**
         * Return the converted AST and additional parser services
         */
        return {
            ast: estree,
            services: {
                hasFullTypeInformation: shouldProvideParserServices,
                program,
                esTreeNodeToTSNodeMap: astMaps.esTreeNodeToTSNodeMap,
                tsNodeToESTreeNodeMap: astMaps.tsNodeToESTreeNodeMap,
            },
        };
    }