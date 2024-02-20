function getTsconfigRootOptionsMap() {
            if (_tsconfigRootOptions === void 0) {
                _tsconfigRootOptions = {
                    name: void 0,
                    // should never be needed since this is root
                    type: "object",
                    elementOptions: commandLineOptionsToMap([
                        {
                            name: "compilerOptions",
                            type: "object",
                            elementOptions: getCommandLineCompilerOptionsMap(),
                            extraKeyDiagnostics: compilerOptionsDidYouMeanDiagnostics
                        },
                        {
                            name: "watchOptions",
                            type: "object",
                            elementOptions: getCommandLineWatchOptionsMap(),
                            extraKeyDiagnostics: watchOptionsDidYouMeanDiagnostics
                        },
                        {
                            name: "typeAcquisition",
                            type: "object",
                            elementOptions: getCommandLineTypeAcquisitionMap(),
                            extraKeyDiagnostics: typeAcquisitionDidYouMeanDiagnostics
                        },
                        extendsOptionDeclaration,
                        {
                            name: "references",
                            type: "list",
                            element: {
                                name: "references",
                                type: "object"
                            },
                            category: Diagnostics.Projects
                        },
                        {
                            name: "files",
                            type: "list",
                            element: {
                                name: "files",
                                type: "string"
                            },
                            category: Diagnostics.File_Management
                        },
                        {
                            name: "include",
                            type: "list",
                            element: {
                                name: "include",
                                type: "string"
                            },
                            category: Diagnostics.File_Management,
                            defaultValueDescription: Diagnostics.if_files_is_specified_otherwise_Asterisk_Asterisk_Slash_Asterisk
                        },
                        {
                            name: "exclude",
                            type: "list",
                            element: {
                                name: "exclude",
                                type: "string"
                            },
                            category: Diagnostics.File_Management,
                            defaultValueDescription: Diagnostics.node_modules_bower_components_jspm_packages_plus_the_value_of_outDir_if_one_is_specified
                        },
                        compileOnSaveCommandLineOption
                    ])
                };
            }
            return _tsconfigRootOptions;
        }