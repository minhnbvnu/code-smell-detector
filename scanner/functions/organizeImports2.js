function organizeImports2(args, formatOptions, preferences = emptyOptions) {
                var _a3;
                synchronizeHostData();
                Debug.assert(args.type === "file");
                const sourceFile = getValidSourceFile(args.fileName);
                const formatContext = ts_formatting_exports.getFormatContext(formatOptions, host);
                const mode = (_a3 = args.mode) != null ? _a3 : args.skipDestructiveCodeActions ? "SortAndCombine" /* SortAndCombine */ : "All" /* All */;
                return ts_OrganizeImports_exports.organizeImports(sourceFile, formatContext, host, program, preferences, mode);
            }