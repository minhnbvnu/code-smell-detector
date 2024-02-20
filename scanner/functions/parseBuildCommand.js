function parseBuildCommand(args) {
            const { options, watchOptions, fileNames: projects, errors } = parseCommandLineWorker(buildOptionsDidYouMeanDiagnostics, args);
            const buildOptions = options;
            if (projects.length === 0) {
                projects.push(".");
            }
            if (buildOptions.clean && buildOptions.force) {
                errors.push(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "clean", "force"));
            }
            if (buildOptions.clean && buildOptions.verbose) {
                errors.push(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "clean", "verbose"));
            }
            if (buildOptions.clean && buildOptions.watch) {
                errors.push(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "clean", "watch"));
            }
            if (buildOptions.watch && buildOptions.dry) {
                errors.push(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "watch", "dry"));
            }
            return { buildOptions, watchOptions, projects, errors };
        }