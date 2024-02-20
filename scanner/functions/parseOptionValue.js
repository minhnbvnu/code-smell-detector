function parseOptionValue(args, i, diagnostics, opt, options, errors) {
            if (opt.isTSConfigOnly) {
                const optValue = args[i];
                if (optValue === "null") {
                    options[opt.name] = void 0;
                    i++;
                }
                else if (opt.type === "boolean") {
                    if (optValue === "false") {
                        options[opt.name] = validateJsonOptionValue(opt, 
                        /*value*/
                        false, errors);
                        i++;
                    }
                    else {
                        if (optValue === "true")
                            i++;
                        errors.push(createCompilerDiagnostic(Diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_false_or_null_on_command_line, opt.name));
                    }
                }
                else {
                    errors.push(createCompilerDiagnostic(Diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_null_on_command_line, opt.name));
                    if (optValue && !startsWith(optValue, "-"))
                        i++;
                }
            }
            else {
                if (!args[i] && opt.type !== "boolean") {
                    errors.push(createCompilerDiagnostic(diagnostics.optionTypeMismatchDiagnostic, opt.name, getCompilerOptionValueTypeString(opt)));
                }
                if (args[i] !== "null") {
                    switch (opt.type) {
                        case "number":
                            options[opt.name] = validateJsonOptionValue(opt, parseInt(args[i]), errors);
                            i++;
                            break;
                        case "boolean":
                            const optValue = args[i];
                            options[opt.name] = validateJsonOptionValue(opt, optValue !== "false", errors);
                            if (optValue === "false" || optValue === "true") {
                                i++;
                            }
                            break;
                        case "string":
                            options[opt.name] = validateJsonOptionValue(opt, args[i] || "", errors);
                            i++;
                            break;
                        case "list":
                            const result = parseListTypeOption(opt, args[i], errors);
                            options[opt.name] = result || [];
                            if (result) {
                                i++;
                            }
                            break;
                        case "listOrElement":
                            Debug.fail("listOrElement not supported here");
                            break;
                        default:
                            options[opt.name] = parseCustomTypeOption(opt, args[i], errors);
                            i++;
                            break;
                    }
                }
                else {
                    options[opt.name] = void 0;
                    i++;
                }
            }
            return i;
        }