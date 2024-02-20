function createPrependNodes(projectReferences, getCommandLine, readFile, host) {
            if (!projectReferences)
                return emptyArray;
            let nodes;
            for (let i = 0; i < projectReferences.length; i++) {
                const ref = projectReferences[i];
                const resolvedRefOpts = getCommandLine(ref, i);
                if (ref.prepend && resolvedRefOpts && resolvedRefOpts.options) {
                    const out = outFile(resolvedRefOpts.options);
                    if (!out)
                        continue;
                    const { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath } = getOutputPathsForBundle(resolvedRefOpts.options, 
                    /*forceDtsPaths*/
                    true);
                    const node = createInputFilesWithFilePaths(readFile, jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath, host, resolvedRefOpts.options);
                    (nodes || (nodes = [])).push(node);
                }
            }
            return nodes || emptyArray;
        }