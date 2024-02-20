function resolveExternalModuleName(location, moduleReferenceExpression, ignoreErrors) {
                const isClassic = getEmitModuleResolutionKind(compilerOptions) === 1 /* Classic */;
                const errorMessage = isClassic ? Diagnostics.Cannot_find_module_0_Did_you_mean_to_set_the_moduleResolution_option_to_nodenext_or_to_add_aliases_to_the_paths_option : Diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations;
                return resolveExternalModuleNameWorker(location, moduleReferenceExpression, ignoreErrors ? void 0 : errorMessage);
            }