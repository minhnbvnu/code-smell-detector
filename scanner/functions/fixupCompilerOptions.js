function fixupCompilerOptions(options, diagnostics) {
            commandLineOptionsStringToEnum = commandLineOptionsStringToEnum || filter(optionDeclarations, (o) => typeof o.type === "object" && !forEachEntry(o.type, (v) => typeof v !== "number"));
            options = cloneCompilerOptions(options);
            for (const opt of commandLineOptionsStringToEnum) {
                if (!hasProperty(options, opt.name)) {
                    continue;
                }
                const value = options[opt.name];
                if (isString(value)) {
                    options[opt.name] = parseCustomTypeOption(opt, value, diagnostics);
                }
                else {
                    if (!forEachEntry(opt.type, (v) => v === value)) {
                        diagnostics.push(createCompilerDiagnosticForInvalidCustomType(opt));
                    }
                }
            }
            return options;
        }