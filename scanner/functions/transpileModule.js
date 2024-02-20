function transpileModule(input, transpileOptions) {
            const diagnostics = [];
            const options = transpileOptions.compilerOptions ? fixupCompilerOptions(transpileOptions.compilerOptions, diagnostics) : {};
            const defaultOptions = getDefaultCompilerOptions2();
            for (const key in defaultOptions) {
                if (hasProperty(defaultOptions, key) && options[key] === void 0) {
                    options[key] = defaultOptions[key];
                }
            }
            for (const option of transpileOptionValueCompilerOptions) {
                if (options.verbatimModuleSyntax && optionsRedundantWithVerbatimModuleSyntax.has(option.name)) {
                    continue;
                }
                options[option.name] = option.transpileOptionValue;
            }
            options.suppressOutputPathCheck = true;
            options.allowNonTsExtensions = true;
            const newLine = getNewLineCharacter(options);
            const compilerHost = {
                getSourceFile: (fileName) => fileName === normalizePath(inputFileName) ? sourceFile : void 0,
                writeFile: (name, text) => {
                    if (fileExtensionIs(name, ".map")) {
                        Debug.assertEqual(sourceMapText, void 0, "Unexpected multiple source map outputs, file:", name);
                        sourceMapText = text;
                    }
                    else {
                        Debug.assertEqual(outputText, void 0, "Unexpected multiple outputs, file:", name);
                        outputText = text;
                    }
                },
                getDefaultLibFileName: () => "lib.d.ts",
                useCaseSensitiveFileNames: () => false,
                getCanonicalFileName: (fileName) => fileName,
                getCurrentDirectory: () => "",
                getNewLine: () => newLine,
                fileExists: (fileName) => fileName === inputFileName,
                readFile: () => "",
                directoryExists: () => true,
                getDirectories: () => []
            };
            const inputFileName = transpileOptions.fileName || (transpileOptions.compilerOptions && transpileOptions.compilerOptions.jsx ? "module.tsx" : "module.ts");
            const sourceFile = createSourceFile(inputFileName, input, {
                languageVersion: getEmitScriptTarget(options),
                impliedNodeFormat: getImpliedNodeFormatForFile(toPath(inputFileName, "", compilerHost.getCanonicalFileName), 
                /*cache*/
                void 0, compilerHost, options),
                setExternalModuleIndicator: getSetExternalModuleIndicator(options)
            });
            if (transpileOptions.moduleName) {
                sourceFile.moduleName = transpileOptions.moduleName;
            }
            if (transpileOptions.renamedDependencies) {
                sourceFile.renamedDependencies = new Map(Object.entries(transpileOptions.renamedDependencies));
            }
            let outputText;
            let sourceMapText;
            const program = createProgram([inputFileName], options, compilerHost);
            if (transpileOptions.reportDiagnostics) {
                addRange(
                /*to*/
                diagnostics, 
                /*from*/
                program.getSyntacticDiagnostics(sourceFile));
                addRange(
                /*to*/
                diagnostics, 
                /*from*/
                program.getOptionsDiagnostics());
            }
            program.emit(
            /*targetSourceFile*/
            void 0, 
            /*writeFile*/
            void 0, 
            /*cancellationToken*/
            void 0, 
            /*emitOnlyDtsFiles*/
            void 0, transpileOptions.transformers);
            if (outputText === void 0)
                return Debug.fail("Output generation failed");
            return { outputText, diagnostics, sourceMapText };
        }