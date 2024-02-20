function cleanWorker(state, project, onlyReferences) {
            const buildOrder = getBuildOrderFor(state, project, onlyReferences);
            if (!buildOrder)
                return 3 /* InvalidProject_OutputsSkipped */;
            if (isCircularBuildOrder(buildOrder)) {
                reportErrors(state, buildOrder.circularDiagnostics);
                return 4 /* ProjectReferenceCycle_OutputsSkipped */;
            }
            const { options, host } = state;
            const filesToDelete = options.dry ? [] : void 0;
            for (const proj of buildOrder) {
                const resolvedPath = toResolvedConfigFilePath(state, proj);
                const parsed = parseConfigFile(state, proj, resolvedPath);
                if (parsed === void 0) {
                    reportParseConfigFileDiagnostic(state, resolvedPath);
                    continue;
                }
                const outputs = getAllProjectOutputs(parsed, !host.useCaseSensitiveFileNames());
                if (!outputs.length)
                    continue;
                const inputFileNames = new Set(parsed.fileNames.map((f) => toPath2(state, f)));
                for (const output of outputs) {
                    if (inputFileNames.has(toPath2(state, output)))
                        continue;
                    if (host.fileExists(output)) {
                        if (filesToDelete) {
                            filesToDelete.push(output);
                        }
                        else {
                            host.deleteFile(output);
                            invalidateProject(state, resolvedPath, 0 /* None */);
                        }
                    }
                }
            }
            if (filesToDelete) {
                reportStatus(state, Diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0, filesToDelete.map((f) => `\r
 * ${f}`).join(""));
            }
            return 0 /* Success */;
        }