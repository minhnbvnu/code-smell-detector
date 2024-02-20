function getRedirectReferenceForResolutionFromSourceOfProject(filePath) {
                const source = getSourceOfProjectReferenceRedirect(filePath);
                if (isString(source))
                    return getResolvedProjectReferenceToRedirect(source);
                if (!source)
                    return void 0;
                return forEachResolvedProjectReference2((resolvedRef) => {
                    const out = outFile(resolvedRef.commandLine.options);
                    if (!out)
                        return void 0;
                    return toPath3(out) === filePath ? resolvedRef : void 0;
                });
            }