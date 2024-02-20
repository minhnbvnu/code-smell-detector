function parseForESLint(code, options) {
        if (!options || typeof options !== 'object') {
            options = {};
        }
        else {
            options = Object.assign({}, options);
        }
        // https://eslint.org/docs/user-guide/configuring#specifying-parser-options
        // if sourceType is not provided by default eslint expect that it will be set to "script"
        if (options.sourceType !== 'module' && options.sourceType !== 'script') {
            options.sourceType = 'script';
        }
        if (typeof options.ecmaFeatures !== 'object') {
            options.ecmaFeatures = {};
        }
        const parserOptions = {};
        Object.assign(parserOptions, options, {
            jsx: validateBoolean(options.ecmaFeatures.jsx),
        });
        const analyzeOptions = {
            ecmaVersion: options.ecmaVersion === 'latest' ? 1e8 : options.ecmaVersion,
            globalReturn: options.ecmaFeatures.globalReturn,
            jsxPragma: options.jsxPragma,
            jsxFragmentName: options.jsxFragmentName,
            lib: options.lib,
            sourceType: options.sourceType,
        };
        /**
         * Allow the user to suppress the warning from typescript-estree if they are using an unsupported
         * version of TypeScript
         */
        const warnOnUnsupportedTypeScriptVersion = validateBoolean(options.warnOnUnsupportedTypeScriptVersion, true);
        if (!warnOnUnsupportedTypeScriptVersion) {
            parserOptions.loggerFn = false;
        }
        const { ast, services } = (0, typescript_estree_1.parseAndGenerateServices)(code, parserOptions);
        ast.sourceType = options.sourceType;
        let emitDecoratorMetadata = options.emitDecoratorMetadata === true;
        if (services.hasFullTypeInformation) {
            // automatically apply the options configured for the program
            const compilerOptions = services.program.getCompilerOptions();
            if (analyzeOptions.lib == null) {
                analyzeOptions.lib = getLib(compilerOptions);
                log('Resolved libs from program: %o', analyzeOptions.lib);
            }
            if (analyzeOptions.jsxPragma === undefined &&
                compilerOptions.jsxFactory != null) {
                // in case the user has specified something like "preact.h"
                const factory = compilerOptions.jsxFactory.split('.')[0].trim();
                analyzeOptions.jsxPragma = factory;
                log('Resolved jsxPragma from program: %s', analyzeOptions.jsxPragma);
            }
            if (analyzeOptions.jsxFragmentName === undefined &&
                compilerOptions.jsxFragmentFactory != null) {
                // in case the user has specified something like "preact.Fragment"
                const fragFactory = compilerOptions.jsxFragmentFactory
                    .split('.')[0]
                    .trim();
                analyzeOptions.jsxFragmentName = fragFactory;
                log('Resolved jsxFragmentName from program: %s', analyzeOptions.jsxFragmentName);
            }
            if (compilerOptions.emitDecoratorMetadata === true) {
                emitDecoratorMetadata = true;
            }
        }
        if (emitDecoratorMetadata) {
            analyzeOptions.emitDecoratorMetadata = true;
        }
        const scopeManager = (0, scope_manager_1.analyze)(ast, analyzeOptions);
        return { ast, services, scopeManager, visitorKeys: typescript_estree_1.visitorKeys };
    }