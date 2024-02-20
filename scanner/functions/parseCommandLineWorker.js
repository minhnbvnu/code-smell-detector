function parseCommandLineWorker(diagnostics, commandLine, readFile) {
            const options = {};
            let watchOptions;
            const fileNames = [];
            const errors = [];
            parseStrings(commandLine);
            return {
                options,
                watchOptions,
                fileNames,
                errors
            };
            function parseStrings(args) {
                let i = 0;
                while (i < args.length) {
                    const s = args[i];
                    i++;
                    if (s.charCodeAt(0) === 64 /* at */) {
                        parseResponseFile(s.slice(1));
                    }
                    else if (s.charCodeAt(0) === 45 /* minus */) {
                        const inputOptionName = s.slice(s.charCodeAt(1) === 45 /* minus */ ? 2 : 1);
                        const opt = getOptionDeclarationFromName(diagnostics.getOptionsNameMap, inputOptionName, 
                        /*allowShort*/
                        true);
                        if (opt) {
                            i = parseOptionValue(args, i, diagnostics, opt, options, errors);
                        }
                        else {
                            const watchOpt = getOptionDeclarationFromName(watchOptionsDidYouMeanDiagnostics.getOptionsNameMap, inputOptionName, 
                            /*allowShort*/
                            true);
                            if (watchOpt) {
                                i = parseOptionValue(args, i, watchOptionsDidYouMeanDiagnostics, watchOpt, watchOptions || (watchOptions = {}), errors);
                            }
                            else {
                                errors.push(createUnknownOptionError(inputOptionName, diagnostics, createCompilerDiagnostic, s));
                            }
                        }
                    }
                    else {
                        fileNames.push(s);
                    }
                }
            }
            function parseResponseFile(fileName) {
                const text = tryReadFile(fileName, readFile || ((fileName2) => sys.readFile(fileName2)));
                if (!isString(text)) {
                    errors.push(text);
                    return;
                }
                const args = [];
                let pos = 0;
                while (true) {
                    while (pos < text.length && text.charCodeAt(pos) <= 32 /* space */)
                        pos++;
                    if (pos >= text.length)
                        break;
                    const start = pos;
                    if (text.charCodeAt(start) === 34 /* doubleQuote */) {
                        pos++;
                        while (pos < text.length && text.charCodeAt(pos) !== 34 /* doubleQuote */)
                            pos++;
                        if (pos < text.length) {
                            args.push(text.substring(start + 1, pos));
                            pos++;
                        }
                        else {
                            errors.push(createCompilerDiagnostic(Diagnostics.Unterminated_quoted_string_in_response_file_0, fileName));
                        }
                    }
                    else {
                        while (text.charCodeAt(pos) > 32 /* space */)
                            pos++;
                        args.push(text.substring(start, pos));
                    }
                }
                parseStrings(args);
            }
        }