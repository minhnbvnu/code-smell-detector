function removeLeadingDirectorySeparator(path) {
            return path[0] === directorySeparator ? path.slice(1) : path;
        }