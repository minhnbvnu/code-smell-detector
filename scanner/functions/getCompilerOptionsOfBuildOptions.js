function getCompilerOptionsOfBuildOptions(buildOptions) {
            const result = {};
            commonOptionsWithBuild.forEach((option) => {
                if (hasProperty(buildOptions, option.name))
                    result[option.name] = buildOptions[option.name];
            });
            return result;
        }