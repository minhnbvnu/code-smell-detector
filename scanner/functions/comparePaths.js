function comparePaths(a, b, currentDirectory, ignoreCase) {
            if (typeof currentDirectory === "string") {
                a = combinePaths(currentDirectory, a);
                b = combinePaths(currentDirectory, b);
            }
            else if (typeof currentDirectory === "boolean") {
                ignoreCase = currentDirectory;
            }
            return comparePathsWorker(a, b, getStringComparer(ignoreCase));
        }