function getReferencesWorker(node, position, options, cb) {
                synchronizeHostData();
                const sourceFiles = options && options.use === ts_FindAllReferences_exports.FindReferencesUse.Rename ? program.getSourceFiles().filter((sourceFile) => !program.isSourceFileDefaultLibrary(sourceFile)) : program.getSourceFiles();
                return ts_FindAllReferences_exports.findReferenceOrRenameEntries(program, cancellationToken, sourceFiles, node, position, options, cb);
            }