function withPackageId(packageInfo, r) {
            let packageId;
            if (r && packageInfo) {
                const packageJsonContent = packageInfo.contents.packageJsonContent;
                if (typeof packageJsonContent.name === "string" && typeof packageJsonContent.version === "string") {
                    packageId = {
                        name: packageJsonContent.name,
                        subModuleName: r.path.slice(packageInfo.packageDirectory.length + directorySeparator.length),
                        version: packageJsonContent.version
                    };
                }
            }
            return r && { path: r.path, extension: r.ext, packageId, resolvedUsingTsExtension: r.resolvedUsingTsExtension };
        }