function reportUpToDateStatus(state, configFileName, status) {
            switch (status.type) {
                case 6 /* OutOfDateWithSelf */:
                    return reportStatus(state, Diagnostics.Project_0_is_out_of_date_because_output_1_is_older_than_input_2, relName(state, configFileName), relName(state, status.outOfDateOutputFileName), relName(state, status.newerInputFileName));
                case 7 /* OutOfDateWithUpstream */:
                    return reportStatus(state, Diagnostics.Project_0_is_out_of_date_because_output_1_is_older_than_input_2, relName(state, configFileName), relName(state, status.outOfDateOutputFileName), relName(state, status.newerProjectName));
                case 4 /* OutputMissing */:
                    return reportStatus(state, Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relName(state, configFileName), relName(state, status.missingOutputFileName));
                case 5 /* ErrorReadingFile */:
                    return reportStatus(state, Diagnostics.Project_0_is_out_of_date_because_there_was_error_reading_file_1, relName(state, configFileName), relName(state, status.fileName));
                case 8 /* OutOfDateBuildInfo */:
                    return reportStatus(state, Diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_some_of_the_changes_were_not_emitted, relName(state, configFileName), relName(state, status.buildInfoFile));
                case 9 /* OutOfDateOptions */:
                    return reportStatus(state, Diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_there_is_change_in_compilerOptions, relName(state, configFileName), relName(state, status.buildInfoFile));
                case 10 /* OutOfDateRoots */:
                    return reportStatus(state, Diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_file_2_was_root_file_of_compilation_but_not_any_more, relName(state, configFileName), relName(state, status.buildInfoFile), relName(state, status.inputFile));
                case 1 /* UpToDate */:
                    if (status.newestInputFileTime !== void 0) {
                        return reportStatus(state, Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_output_2, relName(state, configFileName), relName(state, status.newestInputFileName || ""), relName(state, status.oldestOutputFileName || ""));
                    }
                    break;
                case 3 /* OutOfDateWithPrepend */:
                    return reportStatus(state, Diagnostics.Project_0_is_out_of_date_because_output_of_its_dependency_1_has_changed, relName(state, configFileName), relName(state, status.newerProjectName));
                case 2 /* UpToDateWithUpstreamTypes */:
                    return reportStatus(state, Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies, relName(state, configFileName));
                case 15 /* UpToDateWithInputFileText */:
                    return reportStatus(state, Diagnostics.Project_0_is_up_to_date_but_needs_to_update_timestamps_of_output_files_that_are_older_than_input_files, relName(state, configFileName));
                case 11 /* UpstreamOutOfDate */:
                    return reportStatus(state, Diagnostics.Project_0_is_out_of_date_because_its_dependency_1_is_out_of_date, relName(state, configFileName), relName(state, status.upstreamProjectName));
                case 12 /* UpstreamBlocked */:
                    return reportStatus(state, status.upstreamProjectBlocked ? Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_was_not_built : Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_has_errors, relName(state, configFileName), relName(state, status.upstreamProjectName));
                case 0 /* Unbuildable */:
                    return reportStatus(state, Diagnostics.Failed_to_parse_file_0_Colon_1, relName(state, configFileName), status.reason);
                case 14 /* TsVersionOutputOfDate */:
                    return reportStatus(state, Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2, relName(state, configFileName), status.version, version);
                case 17 /* ForceBuild */:
                    return reportStatus(state, Diagnostics.Project_0_is_being_forcibly_rebuilt, relName(state, configFileName));
                case 16 /* ContainerOnly */:
                case 13 /* ComputingUpstream */:
                    break;
                default:
                    assertType(status);
            }
        }