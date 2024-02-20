function isAllowedOptionForOutput({ category, name, isCommandLineOnly }) {
                const categoriesToSkip = [Diagnostics.Command_line_Options, Diagnostics.Editor_Support, Diagnostics.Compiler_Diagnostics, Diagnostics.Backwards_Compatibility, Diagnostics.Watch_and_Build_Modes, Diagnostics.Output_Formatting];
                return !isCommandLineOnly && category !== void 0 && (!categoriesToSkip.includes(category) || compilerOptionsMap.has(name));
            }