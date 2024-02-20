function getImpliedNodeFormatForFile(fileName, packageJsonInfoCache, host, options) {
            const result = getImpliedNodeFormatForFileWorker(fileName, packageJsonInfoCache, host, options);
            return typeof result === "object" ? result.impliedNodeFormat : result;
        }