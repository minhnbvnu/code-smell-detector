function updateOutputTimestampsWorker(state, proj, projectPath, verboseMessage, skipOutputs) {
            if (proj.options.noEmit)
                return;
            let now;
            const buildInfoPath = getTsBuildInfoEmitOutputFilePath(proj.options);
            if (buildInfoPath) {
                if (!(skipOutputs == null ? void 0 : skipOutputs.has(toPath2(state, buildInfoPath)))) {
                    if (!!state.options.verbose)
                        reportStatus(state, verboseMessage, proj.options.configFilePath);
                    state.host.setModifiedTime(buildInfoPath, now = getCurrentTime(state.host));
                    getBuildInfoCacheEntry(state, buildInfoPath, projectPath).modifiedTime = now;
                }
                state.outputTimeStamps.delete(projectPath);
                return;
            }
            const { host } = state;
            const outputs = getAllProjectOutputs(proj, !host.useCaseSensitiveFileNames());
            const outputTimeStampMap = getOutputTimeStampMap(state, projectPath);
            const modifiedOutputs = outputTimeStampMap ? /* @__PURE__ */ new Set() : void 0;
            if (!skipOutputs || outputs.length !== skipOutputs.size) {
                let reportVerbose = !!state.options.verbose;
                for (const file of outputs) {
                    const path = toPath2(state, file);
                    if (skipOutputs == null ? void 0 : skipOutputs.has(path))
                        continue;
                    if (reportVerbose) {
                        reportVerbose = false;
                        reportStatus(state, verboseMessage, proj.options.configFilePath);
                    }
                    host.setModifiedTime(file, now || (now = getCurrentTime(state.host)));
                    if (outputTimeStampMap) {
                        outputTimeStampMap.set(path, now);
                        modifiedOutputs.add(path);
                    }
                }
            }
            outputTimeStampMap == null ? void 0 : outputTimeStampMap.forEach((_value, key) => {
                if (!(skipOutputs == null ? void 0 : skipOutputs.has(key)) && !modifiedOutputs.has(key))
                    outputTimeStampMap.delete(key);
            });
        }