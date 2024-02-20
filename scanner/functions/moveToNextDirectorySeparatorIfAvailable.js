function moveToNextDirectorySeparatorIfAvailable(path, prevSeparatorIndex) {
            const nextSeparatorIndex = path.indexOf(directorySeparator, prevSeparatorIndex + 1);
            return nextSeparatorIndex === -1 ? prevSeparatorIndex : nextSeparatorIndex;
        }