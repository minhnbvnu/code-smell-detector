function canWatchDirectoryOrFile(dirPath) {
            const rootLength = getRootLength(dirPath);
            if (dirPath.length === rootLength) {
                return false;
            }
            let nextDirectorySeparator = dirPath.indexOf(directorySeparator, rootLength);
            if (nextDirectorySeparator === -1) {
                return false;
            }
            let pathPartForUserCheck = dirPath.substring(rootLength, nextDirectorySeparator + 1);
            const isNonDirectorySeparatorRoot = rootLength > 1 || dirPath.charCodeAt(0) !== 47 /* slash */;
            if (isNonDirectorySeparatorRoot && dirPath.search(/[a-zA-Z]:/) !== 0 && // Non dos style paths
                pathPartForUserCheck.search(/[a-zA-Z]\$\//) === 0) {
                nextDirectorySeparator = dirPath.indexOf(directorySeparator, nextDirectorySeparator + 1);
                if (nextDirectorySeparator === -1) {
                    return false;
                }
                pathPartForUserCheck = dirPath.substring(rootLength + pathPartForUserCheck.length, nextDirectorySeparator + 1);
            }
            if (isNonDirectorySeparatorRoot && pathPartForUserCheck.search(/users\//i) !== 0) {
                return true;
            }
            for (let searchIndex = nextDirectorySeparator + 1, searchLevels = 2; searchLevels > 0; searchLevels--) {
                searchIndex = dirPath.indexOf(directorySeparator, searchIndex) + 1;
                if (searchIndex === 0) {
                    return false;
                }
            }
            return true;
        }