function getResolvedProjectReferenceToRedirect(fileName) {
                if (mapFromFileToProjectReferenceRedirects === void 0) {
                    mapFromFileToProjectReferenceRedirects = /* @__PURE__ */ new Map();
                    forEachResolvedProjectReference2((referencedProject) => {
                        if (toPath3(options.configFilePath) !== referencedProject.sourceFile.path) {
                            referencedProject.commandLine.fileNames.forEach((f) => mapFromFileToProjectReferenceRedirects.set(toPath3(f), referencedProject.sourceFile.path));
                        }
                    });
                }
                const referencedProjectPath = mapFromFileToProjectReferenceRedirects.get(toPath3(fileName));
                return referencedProjectPath && getResolvedProjectReferenceByPath(referencedProjectPath);
            }