function updateOutputTimestamps(state, proj, resolvedPath) {
            if (state.options.dry) {
                return reportStatus(state, Diagnostics.A_non_dry_build_would_update_timestamps_for_output_of_project_0, proj.options.configFilePath);
            }
            updateOutputTimestampsWorker(state, proj, resolvedPath, Diagnostics.Updating_output_timestamps_of_project_0);
            state.projectStatus.set(resolvedPath, {
                type: 1 /* UpToDate */,
                oldestOutputFileName: getFirstProjectOutput(proj, !state.host.useCaseSensitiveFileNames())
            });
        }