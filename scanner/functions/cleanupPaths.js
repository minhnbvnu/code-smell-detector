function cleanupPaths(profile) {
                            let externalFileCounter = 0;
                            const remappedPaths = /* @__PURE__ */ new Map();
                            const normalizedDir = normalizeSlashes(_path.dirname(executingFilePath));
                            const fileUrlRoot = `file://${getRootLength(normalizedDir) === 1 ? "" : "/"}${normalizedDir}`;
                            for (const node of profile.nodes) {
                                if (node.callFrame.url) {
                                    const url = normalizeSlashes(node.callFrame.url);
                                    if (containsPath(fileUrlRoot, url, useCaseSensitiveFileNames)) {
                                        node.callFrame.url = getRelativePathToDirectoryOrUrl(fileUrlRoot, url, fileUrlRoot, createGetCanonicalFileName(useCaseSensitiveFileNames), 
                                        /*isAbsolutePathAnUrl*/
                                        true);
                                    }
                                    else if (!nativePattern.test(url)) {
                                        node.callFrame.url = (remappedPaths.has(url) ? remappedPaths : remappedPaths.set(url, `external${externalFileCounter}.js`)).get(url);
                                        externalFileCounter++;
                                    }
                                }
                            }
                            return profile;
                        }