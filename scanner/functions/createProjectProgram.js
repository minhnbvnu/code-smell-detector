function createProjectProgram(parseSettings) {
        log('Creating project program for: %s', parseSettings.filePath);
        const programsForProjects = (0, getWatchProgramsForProjects_1.getWatchProgramsForProjects)(parseSettings);
        const astAndProgram = (0, node_utils_1.firstDefined)(programsForProjects, currentProgram => (0, shared_1.getAstFromProgram)(currentProgram, parseSettings));
        // The file was either matched within the tsconfig, or we allow creating a default program
        if (astAndProgram || parseSettings.createDefaultProgram) {
            return astAndProgram;
        }
        const describeProjectFilePath = (projectFile) => (0, describeFilePath_1.describeFilePath)(projectFile, parseSettings.tsconfigRootDir);
        const describedFilePath = (0, describeFilePath_1.describeFilePath)(parseSettings.filePath, parseSettings.tsconfigRootDir);
        const relativeProjects = parseSettings.projects.map(describeProjectFilePath);
        const describedPrograms = relativeProjects.length === 1
            ? relativeProjects[0]
            : `\n${relativeProjects.map(project => `- ${project}`).join('\n')}`;
        const errorLines = [
            `ESLint was configured to run on \`${describedFilePath}\` using \`parserOptions.project\`: ${describedPrograms}`,
        ];
        let hasMatchedAnError = false;
        const extraFileExtensions = parseSettings.extraFileExtensions || [];
        extraFileExtensions.forEach(extraExtension => {
            if (!extraExtension.startsWith('.')) {
                errorLines.push(`Found unexpected extension \`${extraExtension}\` specified with the \`parserOptions.extraFileExtensions\` option. Did you mean \`.${extraExtension}\`?`);
            }
            if (DEFAULT_EXTRA_FILE_EXTENSIONS.includes(extraExtension)) {
                errorLines.push(`You unnecessarily included the extension \`${extraExtension}\` with the \`parserOptions.extraFileExtensions\` option. This extension is already handled by the parser by default.`);
            }
        });
        const fileExtension = path_1.default.extname(parseSettings.filePath);
        if (!DEFAULT_EXTRA_FILE_EXTENSIONS.includes(fileExtension)) {
            const nonStandardExt = `The extension for the file (\`${fileExtension}\`) is non-standard`;
            if (extraFileExtensions.length > 0) {
                if (!extraFileExtensions.includes(fileExtension)) {
                    errorLines.push(`${nonStandardExt}. It should be added to your existing \`parserOptions.extraFileExtensions\`.`);
                    hasMatchedAnError = true;
                }
            }
            else {
                errorLines.push(`${nonStandardExt}. You should add \`parserOptions.extraFileExtensions\` to your config.`);
                hasMatchedAnError = true;
            }
        }
        if (!hasMatchedAnError) {
            const [describedInclusions, describedSpecifiers] = parseSettings.projects.length === 1
                ? ['that TSConfig does not', 'that TSConfig']
                : ['none of those TSConfigs', 'one of those TSConfigs'];
            errorLines.push(`However, ${describedInclusions} include this file. Either:`, `- Change ESLint's list of included files to not include this file`, `- Change ${describedSpecifiers} to include this file`, `- Create a new TSConfig that includes this file and include it in your parserOptions.project`, `See the typescript-eslint docs for more info: https://typescript-eslint.io/linting/troubleshooting#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file`);
        }
        throw new Error(errorLines.join('\n'));
    }