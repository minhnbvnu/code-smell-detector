function getBuildInfoFileVersionMap(program, buildInfoPath, host) {
            const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
            const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
            const fileInfos = /* @__PURE__ */ new Map();
            let rootIndex = 0;
            const roots = [];
            program.fileInfos.forEach((fileInfo, index) => {
                const path = toPath(program.fileNames[index], buildInfoDirectory, getCanonicalFileName);
                const version2 = isString(fileInfo) ? fileInfo : fileInfo.version;
                fileInfos.set(path, version2);
                if (rootIndex < program.root.length) {
                    const current = program.root[rootIndex];
                    const fileId = index + 1;
                    if (isArray(current)) {
                        if (current[0] <= fileId && fileId <= current[1]) {
                            roots.push(path);
                            if (current[1] === fileId)
                                rootIndex++;
                        }
                    }
                    else if (current === fileId) {
                        roots.push(path);
                        rootIndex++;
                    }
                }
            });
            return { fileInfos, roots };
        }