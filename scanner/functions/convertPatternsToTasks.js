function convertPatternsToTasks(positive, negative, dynamic) {
        const tasks = [];
        const patternsOutsideCurrentDirectory = utils.pattern.getPatternsOutsideCurrentDirectory(positive);
        const patternsInsideCurrentDirectory = utils.pattern.getPatternsInsideCurrentDirectory(positive);
        const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsOutsideCurrentDirectory);
        const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsInsideCurrentDirectory);
        tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic));
        /*
         * For the sake of reducing future accesses to the file system, we merge all tasks within the current directory
         * into a global task, if at least one pattern refers to the root (`.`). In this case, the global task covers the rest.
         */
        if ('.' in insideCurrentDirectoryGroup) {
            tasks.push(convertPatternGroupToTask('.', patternsInsideCurrentDirectory, negative, dynamic));
        }
        else {
            tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic));
        }
        return tasks;
    }