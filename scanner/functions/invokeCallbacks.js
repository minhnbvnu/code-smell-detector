function invokeCallbacks(dirPath, fileNameOrInvokeMap, fileNames) {
                let fileName;
                let invokeMap;
                if (isString(fileNameOrInvokeMap)) {
                    fileName = fileNameOrInvokeMap;
                }
                else {
                    invokeMap = fileNameOrInvokeMap;
                }
                callbackCache.forEach((callbacks, rootDirName) => {
                    if (invokeMap && invokeMap.get(rootDirName) === true)
                        return;
                    if (rootDirName === dirPath || startsWith(dirPath, rootDirName) && dirPath[rootDirName.length] === directorySeparator) {
                        if (invokeMap) {
                            if (fileNames) {
                                const existing = invokeMap.get(rootDirName);
                                if (existing) {
                                    existing.push(...fileNames);
                                }
                                else {
                                    invokeMap.set(rootDirName, fileNames.slice());
                                }
                            }
                            else {
                                invokeMap.set(rootDirName, true);
                            }
                        }
                        else {
                            callbacks.forEach(({ callback }) => callback(fileName));
                        }
                    }
                });
            }