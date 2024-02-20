function createPackageJsonInfo(fileName, host) {
            if (!host.readFile) {
                return void 0;
            }
            const dependencyKeys = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"];
            const stringContent = host.readFile(fileName) || "";
            const content = tryParseJson(stringContent);
            const info = {};
            if (content) {
                for (const key of dependencyKeys) {
                    const dependencies = content[key];
                    if (!dependencies) {
                        continue;
                    }
                    const dependencyMap = /* @__PURE__ */ new Map();
                    for (const packageName in dependencies) {
                        dependencyMap.set(packageName, dependencies[packageName]);
                    }
                    info[key] = dependencyMap;
                }
            }
            const dependencyGroups = [
                [1 /* Dependencies */, info.dependencies],
                [2 /* DevDependencies */, info.devDependencies],
                [8 /* OptionalDependencies */, info.optionalDependencies],
                [4 /* PeerDependencies */, info.peerDependencies]
            ];
            return {
                ...info,
                parseable: !!content,
                fileName,
                get,
                has(dependencyName, inGroups) {
                    return !!get(dependencyName, inGroups);
                }
            };
            function get(dependencyName, inGroups = 15 /* All */) {
                for (const [group2, deps] of dependencyGroups) {
                    if (deps && inGroups & group2) {
                        const dep = deps.get(dependencyName);
                        if (dep !== void 0) {
                            return dep;
                        }
                    }
                }
            }
        }