function explainIfFileIsRedirectAndImpliedFormat(file, fileNameConvertor) {
            var _a2;
            let result;
            if (file.path !== file.resolvedPath) {
                (result != null ? result : result = []).push(chainDiagnosticMessages(
                /*details*/
                void 0, Diagnostics.File_is_output_of_project_reference_source_0, toFileName(file.originalFileName, fileNameConvertor)));
            }
            if (file.redirectInfo) {
                (result != null ? result : result = []).push(chainDiagnosticMessages(
                /*details*/
                void 0, Diagnostics.File_redirects_to_file_0, toFileName(file.redirectInfo.redirectTarget, fileNameConvertor)));
            }
            if (isExternalOrCommonJsModule(file)) {
                switch (file.impliedNodeFormat) {
                    case 99 /* ESNext */:
                        if (file.packageJsonScope) {
                            (result != null ? result : result = []).push(chainDiagnosticMessages(
                            /*details*/
                            void 0, Diagnostics.File_is_ECMAScript_module_because_0_has_field_type_with_value_module, toFileName(last(file.packageJsonLocations), fileNameConvertor)));
                        }
                        break;
                    case 1 /* CommonJS */:
                        if (file.packageJsonScope) {
                            (result != null ? result : result = []).push(chainDiagnosticMessages(
                            /*details*/
                            void 0, file.packageJsonScope.contents.packageJsonContent.type ? Diagnostics.File_is_CommonJS_module_because_0_has_field_type_whose_value_is_not_module : Diagnostics.File_is_CommonJS_module_because_0_does_not_have_field_type, toFileName(last(file.packageJsonLocations), fileNameConvertor)));
                        }
                        else if ((_a2 = file.packageJsonLocations) == null ? void 0 : _a2.length) {
                            (result != null ? result : result = []).push(chainDiagnosticMessages(
                            /*details*/
                            void 0, Diagnostics.File_is_CommonJS_module_because_package_json_was_not_found));
                        }
                        break;
                }
            }
            return result;
        }