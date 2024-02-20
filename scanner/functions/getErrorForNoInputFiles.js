function getErrorForNoInputFiles({ includeSpecs, excludeSpecs }, configFileName) {
            return createCompilerDiagnostic(Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2, configFileName || "tsconfig.json", JSON.stringify(includeSpecs || []), JSON.stringify(excludeSpecs || []));
        }