function queueReferencingProjects(state, project, projectPath, projectIndex, config, buildOrder, buildResult) {
            if (buildResult & 124 /* AnyErrors */)
                return;
            if (!config.options.composite)
                return;
            for (let index = projectIndex + 1; index < buildOrder.length; index++) {
                const nextProject = buildOrder[index];
                const nextProjectPath = toResolvedConfigFilePath(state, nextProject);
                if (state.projectPendingBuild.has(nextProjectPath))
                    continue;
                const nextProjectConfig = parseConfigFile(state, nextProject, nextProjectPath);
                if (!nextProjectConfig || !nextProjectConfig.projectReferences)
                    continue;
                for (const ref of nextProjectConfig.projectReferences) {
                    const resolvedRefPath = resolveProjectName(state, ref.path);
                    if (toResolvedConfigFilePath(state, resolvedRefPath) !== projectPath)
                        continue;
                    const status = state.projectStatus.get(nextProjectPath);
                    if (status) {
                        switch (status.type) {
                            case 1 /* UpToDate */:
                                if (buildResult & 2 /* DeclarationOutputUnchanged */) {
                                    if (ref.prepend) {
                                        state.projectStatus.set(nextProjectPath, {
                                            type: 3 /* OutOfDateWithPrepend */,
                                            outOfDateOutputFileName: status.oldestOutputFileName,
                                            newerProjectName: project
                                        });
                                    }
                                    else {
                                        status.type = 2 /* UpToDateWithUpstreamTypes */;
                                    }
                                    break;
                                }
                            case 15 /* UpToDateWithInputFileText */:
                            case 2 /* UpToDateWithUpstreamTypes */:
                            case 3 /* OutOfDateWithPrepend */:
                                if (!(buildResult & 2 /* DeclarationOutputUnchanged */)) {
                                    state.projectStatus.set(nextProjectPath, {
                                        type: 7 /* OutOfDateWithUpstream */,
                                        outOfDateOutputFileName: status.type === 3 /* OutOfDateWithPrepend */ ? status.outOfDateOutputFileName : status.oldestOutputFileName,
                                        newerProjectName: project
                                    });
                                }
                                break;
                            case 12 /* UpstreamBlocked */:
                                if (toResolvedConfigFilePath(state, resolveProjectName(state, status.upstreamProjectName)) === projectPath) {
                                    clearProjectStatus(state, nextProjectPath);
                                }
                                break;
                        }
                    }
                    addProjToQueue(state, nextProjectPath, 0 /* None */);
                    break;
                }
            }
        }