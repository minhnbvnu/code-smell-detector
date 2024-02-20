function getFixInfos(context, errorCode, pos, useAutoImportProvider) {
            const symbolToken = getTokenAtPosition(context.sourceFile, pos);
            let info;
            if (errorCode === Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code) {
                info = getFixesInfoForUMDImport(context, symbolToken);
            }
            else if (!isIdentifier(symbolToken)) {
                return void 0;
            }
            else if (errorCode === Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.code) {
                const symbolName2 = single(getSymbolNamesToImport(context.sourceFile, context.program.getTypeChecker(), symbolToken, context.program.getCompilerOptions()));
                const fix = getTypeOnlyPromotionFix(context.sourceFile, symbolToken, symbolName2, context.program);
                return fix && [{ fix, symbolName: symbolName2, errorIdentifierText: symbolToken.text }];
            }
            else {
                info = getFixesInfoForNonUMDImport(context, symbolToken, useAutoImportProvider);
            }
            const packageJsonImportFilter = createPackageJsonImportFilter(context.sourceFile, context.preferences, context.host);
            return info && sortFixInfo(info, context.sourceFile, context.program, packageJsonImportFilter, context.host);
        }