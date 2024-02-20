function removeIgnoredPackageId(r) {
            if (r) {
                Debug.assert(r.packageId === void 0);
                return { path: r.path, ext: r.extension, resolvedUsingTsExtension: r.resolvedUsingTsExtension };
            }
        }