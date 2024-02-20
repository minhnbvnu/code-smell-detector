function createAndAddChildDirectoryWatcher(childName) {
                    const result = createDirectoryWatcher(childName, options);
                    addChildDirectoryWatcher(result);
                }