function getOverwrittenDefaultOptions() {
                const result = [];
                const tab = makePadding(2);
                commandOptionsWithoutBuild.forEach((cmd) => {
                    if (!compilerOptionsMap.has(cmd.name)) {
                        return;
                    }
                    const newValue = compilerOptionsMap.get(cmd.name);
                    const defaultValue = getDefaultValueForOption(cmd);
                    if (newValue !== defaultValue) {
                        result.push(`${tab}${cmd.name}: ${newValue}`);
                    }
                    else if (hasProperty(defaultInitCompilerOptions, cmd.name)) {
                        result.push(`${tab}${cmd.name}: ${defaultValue}`);
                    }
                });
                return result.join(newLine) + newLine;
            }