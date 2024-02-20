function removeResolutionsFromProjectReferenceRedirects(filePath) {
                if (!fileExtensionIs(filePath, ".json" /* Json */))
                    return;
                const program = resolutionHost.getCurrentProgram();
                if (!program)
                    return;
                const resolvedProjectReference = program.getResolvedProjectReferenceByPath(filePath);
                if (!resolvedProjectReference)
                    return;
                resolvedProjectReference.commandLine.fileNames.forEach((f) => removeResolutionsOfFile(resolutionHost.toPath(f)));
            }