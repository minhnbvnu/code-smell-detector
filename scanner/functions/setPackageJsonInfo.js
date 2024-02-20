function setPackageJsonInfo(packageJsonPath, info) {
                (cache || (cache = /* @__PURE__ */ new Map())).set(toPath(packageJsonPath, currentDirectory, getCanonicalFileName), info);
            }