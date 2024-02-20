function getPathFromPathComponents(pathComponents2) {
            if (pathComponents2.length === 0)
                return "";
            const root = pathComponents2[0] && ensureTrailingDirectorySeparator(pathComponents2[0]);
            return root + pathComponents2.slice(1).join(directorySeparator);
        }