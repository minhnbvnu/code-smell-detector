function comparePathsCaseInsensitive(a, b) {
            return comparePathsWorker(a, b, compareStringsCaseInsensitive);
        }