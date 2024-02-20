function parseWithNodeMapsInternal(code, options, shouldPreserveNodeMaps) {
        /**
         * Reset the parse configuration
         */
        const parseSettings = (0, createParseSettings_1.createParseSettings)(code, options);
        /**
         * Ensure users do not attempt to use parse() when they need parseAndGenerateServices()
         */
        if (options === null || options === void 0 ? void 0 : options.errorOnTypeScriptSyntacticAndSemanticIssues) {
            throw new Error(`"errorOnTypeScriptSyntacticAndSemanticIssues" is only supported for parseAndGenerateServices()`);
        }
        /**
         * Create a ts.SourceFile directly, no ts.Program is needed for a simple parse
         */
        const ast = (0, createSourceFile_1.createSourceFile)(parseSettings);
        /**
         * Convert the TypeScript AST to an ESTree-compatible one
         */
        const { estree, astMaps } = (0, ast_converter_1.astConverter)(ast, parseSettings, shouldPreserveNodeMaps);
        return {
            ast: estree,
            esTreeNodeToTSNodeMap: astMaps.esTreeNodeToTSNodeMap,
            tsNodeToESTreeNodeMap: astMaps.tsNodeToESTreeNodeMap,
        };
    }