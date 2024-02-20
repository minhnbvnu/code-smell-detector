function errorOnImplicitAnyModule(isError, errorNode, sourceFile, mode, { packageId, resolvedFileName }, moduleReference) {
                var _a2, _b;
                let errorInfo;
                if (!isExternalModuleNameRelative(moduleReference) && packageId) {
                    const node10Result = (_b = (_a2 = sourceFile.resolvedModules) == null ? void 0 : _a2.get(moduleReference, mode)) == null ? void 0 : _b.node10Result;
                    errorInfo = node10Result ? chainDiagnosticMessages(
                    /*details*/
                    void 0, Diagnostics.There_are_types_at_0_but_this_result_could_not_be_resolved_when_respecting_package_json_exports_The_1_library_may_need_to_update_its_package_json_or_typings, node10Result, node10Result.indexOf(nodeModulesPathPart + "@types/") > -1 ? `@types/${mangleScopedPackageName(packageId.name)}` : packageId.name) : typesPackageExists(packageId.name) ? chainDiagnosticMessages(
                    /*details*/
                    void 0, Diagnostics.If_the_0_package_actually_exposes_this_module_consider_sending_a_pull_request_to_amend_https_Colon_Slash_Slashgithub_com_SlashDefinitelyTyped_SlashDefinitelyTyped_Slashtree_Slashmaster_Slashtypes_Slash_1, packageId.name, mangleScopedPackageName(packageId.name)) : packageBundlesTypes(packageId.name) ? chainDiagnosticMessages(
                    /*details*/
                    void 0, Diagnostics.If_the_0_package_actually_exposes_this_module_try_adding_a_new_declaration_d_ts_file_containing_declare_module_1, packageId.name, moduleReference) : chainDiagnosticMessages(
                    /*details*/
                    void 0, Diagnostics.Try_npm_i_save_dev_types_Slash_1_if_it_exists_or_add_a_new_declaration_d_ts_file_containing_declare_module_0, moduleReference, mangleScopedPackageName(packageId.name));
                }
                errorOrSuggestion(isError, errorNode, chainDiagnosticMessages(errorInfo, Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type, moduleReference, resolvedFileName));
            }