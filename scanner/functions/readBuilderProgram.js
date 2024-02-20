function readBuilderProgram(compilerOptions, host) {
            const buildInfoPath = getTsBuildInfoEmitOutputFilePath(compilerOptions);
            if (!buildInfoPath)
                return void 0;
            let buildInfo;
            if (host.getBuildInfo) {
                buildInfo = host.getBuildInfo(buildInfoPath, compilerOptions.configFilePath);
            }
            else {
                const content = host.readFile(buildInfoPath);
                if (!content)
                    return void 0;
                buildInfo = getBuildInfo(buildInfoPath, content);
            }
            if (!buildInfo || buildInfo.version !== version || !buildInfo.program)
                return void 0;
            return createBuilderProgramUsingProgramBuildInfo(buildInfo, buildInfoPath, host);
        }