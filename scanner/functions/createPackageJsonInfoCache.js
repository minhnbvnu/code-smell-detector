function createPackageJsonInfoCache(currentDirectory, getCanonicalFileName) {
            let cache;
            return { getPackageJsonInfo: getPackageJsonInfo2, setPackageJsonInfo, clear: clear2, entries, getInternalMap };
            function getPackageJsonInfo2(packageJsonPath) {
                return cache == null ? void 0 : cache.get(toPath(packageJsonPath, currentDirectory, getCanonicalFileName));
            }
            function setPackageJsonInfo(packageJsonPath, info) {
                (cache || (cache = /* @__PURE__ */ new Map())).set(toPath(packageJsonPath, currentDirectory, getCanonicalFileName), info);
            }
            function clear2() {
                cache = void 0;
            }
            function entries() {
                const iter = cache == null ? void 0 : cache.entries();
                return iter ? arrayFrom(iter) : [];
            }
            function getInternalMap() {
                return cache;
            }
        }