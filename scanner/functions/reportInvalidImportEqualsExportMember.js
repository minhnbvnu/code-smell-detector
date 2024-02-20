function reportInvalidImportEqualsExportMember(node, name, declarationName, moduleName) {
                if (moduleKind >= 5 /* ES2015 */) {
                    const message = getESModuleInterop(compilerOptions) ? Diagnostics._0_can_only_be_imported_by_using_a_default_import : Diagnostics._0_can_only_be_imported_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import;
                    error(name, message, declarationName);
                }
                else {
                    if (isInJSFile(node)) {
                        const message = getESModuleInterop(compilerOptions) ? Diagnostics._0_can_only_be_imported_by_using_a_require_call_or_by_using_a_default_import : Diagnostics._0_can_only_be_imported_by_using_a_require_call_or_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import;
                        error(name, message, declarationName);
                    }
                    else {
                        const message = getESModuleInterop(compilerOptions) ? Diagnostics._0_can_only_be_imported_by_using_import_1_require_2_or_a_default_import : Diagnostics._0_can_only_be_imported_by_using_import_1_require_2_or_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import;
                        error(name, message, declarationName, declarationName, moduleName);
                    }
                }
            }