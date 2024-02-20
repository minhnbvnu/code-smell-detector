function getNodeModulePathParts(fullPath) {
            let topLevelNodeModulesIndex = 0;
            let topLevelPackageNameIndex = 0;
            let packageRootIndex = 0;
            let fileNameIndex = 0;
            let States;
            ((States2) => {
                States2[States2["BeforeNodeModules"] = 0] = "BeforeNodeModules";
                States2[States2["NodeModules"] = 1] = "NodeModules";
                States2[States2["Scope"] = 2] = "Scope";
                States2[States2["PackageContent"] = 3] = "PackageContent";
            })(States || (States = {}));
            let partStart = 0;
            let partEnd = 0;
            let state = 0 /* BeforeNodeModules */;
            while (partEnd >= 0) {
                partStart = partEnd;
                partEnd = fullPath.indexOf("/", partStart + 1);
                switch (state) {
                    case 0 /* BeforeNodeModules */:
                        if (fullPath.indexOf(nodeModulesPathPart, partStart) === partStart) {
                            topLevelNodeModulesIndex = partStart;
                            topLevelPackageNameIndex = partEnd;
                            state = 1 /* NodeModules */;
                        }
                        break;
                    case 1 /* NodeModules */:
                    case 2 /* Scope */:
                        if (state === 1 /* NodeModules */ && fullPath.charAt(partStart + 1) === "@") {
                            state = 2 /* Scope */;
                        }
                        else {
                            packageRootIndex = partEnd;
                            state = 3 /* PackageContent */;
                        }
                        break;
                    case 3 /* PackageContent */:
                        if (fullPath.indexOf(nodeModulesPathPart, partStart) === partStart) {
                            state = 1 /* NodeModules */;
                        }
                        else {
                            state = 3 /* PackageContent */;
                        }
                        break;
                }
            }
            fileNameIndex = partStart;
            return state > 1 /* NodeModules */ ? { topLevelNodeModulesIndex, topLevelPackageNameIndex, packageRootIndex, fileNameIndex } : void 0;
        }