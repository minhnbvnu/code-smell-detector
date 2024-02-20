function getSourceFileFromReferenceWorker(fileName, getSourceFile2, fail, reason) {
                if (hasExtension(fileName)) {
                    const canonicalFileName = host.getCanonicalFileName(fileName);
                    if (!options.allowNonTsExtensions && !forEach(flatten(supportedExtensionsWithJsonIfResolveJsonModule), (extension) => fileExtensionIs(canonicalFileName, extension))) {
                        if (fail) {
                            if (hasJSFileExtension(canonicalFileName)) {
                                fail(Diagnostics.File_0_is_a_JavaScript_file_Did_you_mean_to_enable_the_allowJs_option, fileName);
                            }
                            else {
                                fail(Diagnostics.File_0_has_an_unsupported_extension_The_only_supported_extensions_are_1, fileName, "'" + flatten(supportedExtensions).join("', '") + "'");
                            }
                        }
                        return void 0;
                    }
                    const sourceFile = getSourceFile2(fileName);
                    if (fail) {
                        if (!sourceFile) {
                            const redirect = getProjectReferenceRedirect(fileName);
                            if (redirect) {
                                fail(Diagnostics.Output_file_0_has_not_been_built_from_source_file_1, redirect, fileName);
                            }
                            else {
                                fail(Diagnostics.File_0_not_found, fileName);
                            }
                        }
                        else if (isReferencedFile(reason) && canonicalFileName === host.getCanonicalFileName(getSourceFileByPath(reason.file).fileName)) {
                            fail(Diagnostics.A_file_cannot_have_a_reference_to_itself);
                        }
                    }
                    return sourceFile;
                }
                else {
                    const sourceFileNoExtension = options.allowNonTsExtensions && getSourceFile2(fileName);
                    if (sourceFileNoExtension)
                        return sourceFileNoExtension;
                    if (fail && options.allowNonTsExtensions) {
                        fail(Diagnostics.File_0_not_found, fileName);
                        return void 0;
                    }
                    const sourceFileWithAddedExtension = forEach(supportedExtensions[0], (extension) => getSourceFile2(fileName + extension));
                    if (fail && !sourceFileWithAddedExtension)
                        fail(Diagnostics.Could_not_resolve_the_path_0_with_the_extensions_Colon_1, fileName, "'" + flatten(supportedExtensions).join("', '") + "'");
                    return sourceFileWithAddedExtension;
                }
            }