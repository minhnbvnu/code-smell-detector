function getPathWithoutRoot(pathComponents2) {
            if (pathComponents2.length === 0)
                return "";
            return pathComponents2.slice(1).join(directorySeparator);
        }