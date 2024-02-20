function getProjectConfigFiles(parseSettings, project) {
        var _a;
        if (project !== true) {
            return project === undefined || Array.isArray(project)
                ? project
                : [project];
        }
        log('Looking for tsconfig.json at or above file: %s', parseSettings.filePath);
        let directory = path.dirname(parseSettings.filePath);
        const checkedDirectories = [directory];
        do {
            log('Checking tsconfig.json path: %s', directory);
            const tsconfigPath = path.join(directory, 'tsconfig.json');
            const cached = (_a = parseSettings.tsconfigMatchCache.get(directory)) !== null && _a !== void 0 ? _a : (fs.existsSync(tsconfigPath) && tsconfigPath);
            if (cached) {
                for (const directory of checkedDirectories) {
                    parseSettings.tsconfigMatchCache.set(directory, cached);
                }
                return [cached];
            }
            directory = path.dirname(directory);
            checkedDirectories.push(directory);
        } while (directory.length > 1 &&
            directory.length >= parseSettings.tsconfigRootDir.length);
        throw new Error(`project was set to \`true\` but couldn't find any tsconfig.json relative to '${parseSettings.filePath}' within '${parseSettings.tsconfigRootDir}'.`);
    }