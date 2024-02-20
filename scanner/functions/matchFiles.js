function matchFiles(path, extensions, excludes, includes, useCaseSensitiveFileNames, currentDirectory, depth, getFileSystemEntries, realpath) {
            path = normalizePath(path);
            currentDirectory = normalizePath(currentDirectory);
            const patterns = getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory);
            const includeFileRegexes = patterns.includeFilePatterns && patterns.includeFilePatterns.map((pattern) => getRegexFromPattern(pattern, useCaseSensitiveFileNames));
            const includeDirectoryRegex = patterns.includeDirectoryPattern && getRegexFromPattern(patterns.includeDirectoryPattern, useCaseSensitiveFileNames);
            const excludeRegex = patterns.excludePattern && getRegexFromPattern(patterns.excludePattern, useCaseSensitiveFileNames);
            const results = includeFileRegexes ? includeFileRegexes.map(() => []) : [[]];
            const visited = /* @__PURE__ */ new Map();
            const toCanonical = createGetCanonicalFileName(useCaseSensitiveFileNames);
            for (const basePath of patterns.basePaths) {
                visitDirectory(basePath, combinePaths(currentDirectory, basePath), depth);
            }
            return flatten(results);
            function visitDirectory(path2, absolutePath, depth2) {
                const canonicalPath = toCanonical(realpath(absolutePath));
                if (visited.has(canonicalPath))
                    return;
                visited.set(canonicalPath, true);
                const { files, directories } = getFileSystemEntries(path2);
                for (const current of sort(files, compareStringsCaseSensitive)) {
                    const name = combinePaths(path2, current);
                    const absoluteName = combinePaths(absolutePath, current);
                    if (extensions && !fileExtensionIsOneOf(name, extensions))
                        continue;
                    if (excludeRegex && excludeRegex.test(absoluteName))
                        continue;
                    if (!includeFileRegexes) {
                        results[0].push(name);
                    }
                    else {
                        const includeIndex = findIndex(includeFileRegexes, (re) => re.test(absoluteName));
                        if (includeIndex !== -1) {
                            results[includeIndex].push(name);
                        }
                    }
                }
                if (depth2 !== void 0) {
                    depth2--;
                    if (depth2 === 0) {
                        return;
                    }
                }
                for (const current of sort(directories, compareStringsCaseSensitive)) {
                    const name = combinePaths(path2, current);
                    const absoluteName = combinePaths(absolutePath, current);
                    if ((!includeDirectoryRegex || includeDirectoryRegex.test(absoluteName)) && (!excludeRegex || !excludeRegex.test(absoluteName))) {
                        visitDirectory(name, absoluteName, depth2);
                    }
                }
            }
        }