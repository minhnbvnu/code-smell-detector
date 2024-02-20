function getRedirectReferenceForResolution(file) {
                const redirect = getResolvedProjectReferenceToRedirect(file.originalFileName);
                if (redirect || !isDeclarationFileName(file.originalFileName))
                    return redirect;
                const resultFromDts = getRedirectReferenceForResolutionFromSourceOfProject(file.path);
                if (resultFromDts)
                    return resultFromDts;
                if (!host.realpath || !options.preserveSymlinks || !stringContains(file.originalFileName, nodeModulesPathPart))
                    return void 0;
                const realDeclarationPath = toPath3(host.realpath(file.originalFileName));
                return realDeclarationPath === file.path ? void 0 : getRedirectReferenceForResolutionFromSourceOfProject(realDeclarationPath);
            }