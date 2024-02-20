function verifyEmitFilePath(emitFileName, emitFilesSeen) {
                    if (emitFileName) {
                        const emitFilePath = toPath3(emitFileName);
                        if (filesByName.has(emitFilePath)) {
                            let chain;
                            if (!options.configFilePath) {
                                chain = chainDiagnosticMessages(
                                /*details*/
                                void 0, Diagnostics.Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript_files_Learn_more_at_https_Colon_Slash_Slashaka_ms_Slashtsconfig);
                            }
                            chain = chainDiagnosticMessages(chain, Diagnostics.Cannot_write_file_0_because_it_would_overwrite_input_file, emitFileName);
                            blockEmittingOfFile(emitFileName, createCompilerDiagnosticFromMessageChain(chain));
                        }
                        const emitFileKey = !host.useCaseSensitiveFileNames() ? toFileNameLowerCase(emitFilePath) : emitFilePath;
                        if (emitFilesSeen.has(emitFileKey)) {
                            blockEmittingOfFile(emitFileName, createCompilerDiagnostic(Diagnostics.Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files, emitFileName));
                        }
                        else {
                            emitFilesSeen.add(emitFileKey);
                        }
                    }
                }