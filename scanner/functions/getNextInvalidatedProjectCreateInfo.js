function getNextInvalidatedProjectCreateInfo(state, buildOrder, reportQueue) {
            if (!state.projectPendingBuild.size)
                return void 0;
            if (isCircularBuildOrder(buildOrder))
                return void 0;
            const { options, projectPendingBuild } = state;
            for (let projectIndex = 0; projectIndex < buildOrder.length; projectIndex++) {
                const project = buildOrder[projectIndex];
                const projectPath = toResolvedConfigFilePath(state, project);
                const reloadLevel = state.projectPendingBuild.get(projectPath);
                if (reloadLevel === void 0)
                    continue;
                if (reportQueue) {
                    reportQueue = false;
                    reportBuildQueue(state, buildOrder);
                }
                const config = parseConfigFile(state, project, projectPath);
                if (!config) {
                    reportParseConfigFileDiagnostic(state, projectPath);
                    projectPendingBuild.delete(projectPath);
                    continue;
                }
                if (reloadLevel === 2 /* Full */) {
                    watchConfigFile(state, project, projectPath, config);
                    watchExtendedConfigFiles(state, projectPath, config);
                    watchWildCardDirectories(state, project, projectPath, config);
                    watchInputFiles(state, project, projectPath, config);
                    watchPackageJsonFiles(state, project, projectPath, config);
                }
                else if (reloadLevel === 1 /* Partial */) {
                    config.fileNames = getFileNamesFromConfigSpecs(config.options.configFile.configFileSpecs, getDirectoryPath(project), config.options, state.parseConfigFileHost);
                    updateErrorForNoInputFiles(config.fileNames, project, config.options.configFile.configFileSpecs, config.errors, canJsonReportNoInputFiles(config.raw));
                    watchInputFiles(state, project, projectPath, config);
                    watchPackageJsonFiles(state, project, projectPath, config);
                }
                const status = getUpToDateStatus(state, config, projectPath);
                if (!options.force) {
                    if (status.type === 1 /* UpToDate */) {
                        verboseReportProjectStatus(state, project, status);
                        reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
                        projectPendingBuild.delete(projectPath);
                        if (options.dry) {
                            reportStatus(state, Diagnostics.Project_0_is_up_to_date, project);
                        }
                        continue;
                    }
                    if (status.type === 2 /* UpToDateWithUpstreamTypes */ || status.type === 15 /* UpToDateWithInputFileText */) {
                        reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
                        return {
                            kind: 2 /* UpdateOutputFileStamps */,
                            status,
                            project,
                            projectPath,
                            projectIndex,
                            config
                        };
                    }
                }
                if (status.type === 12 /* UpstreamBlocked */) {
                    verboseReportProjectStatus(state, project, status);
                    reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
                    projectPendingBuild.delete(projectPath);
                    if (options.verbose) {
                        reportStatus(state, status.upstreamProjectBlocked ? Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_was_not_built : Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors, project, status.upstreamProjectName);
                    }
                    continue;
                }
                if (status.type === 16 /* ContainerOnly */) {
                    verboseReportProjectStatus(state, project, status);
                    reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
                    projectPendingBuild.delete(projectPath);
                    continue;
                }
                return {
                    kind: needsBuild(state, status, config) ? 0 /* Build */ : 1 /* UpdateBundle */,
                    status,
                    project,
                    projectPath,
                    projectIndex,
                    config
                };
            }
            return void 0;
        }