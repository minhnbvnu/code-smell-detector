function updatePackageJsonWatch(lookups, packageJsonWatches, createPackageJsonWatch) {
            const newMap = new Map(lookups);
            mutateMap(packageJsonWatches, newMap, {
                createNewValue: createPackageJsonWatch,
                onDeleteValue: closeFileWatcher
            });
        }