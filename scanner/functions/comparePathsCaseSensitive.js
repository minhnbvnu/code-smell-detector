function comparePathsCaseSensitive(a, b) {
            return comparePathsWorker(a, b, compareStringsCaseSensitive);
        }