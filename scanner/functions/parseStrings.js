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