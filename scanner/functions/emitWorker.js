function emitWorker(program2, sourceFile, writeFileCallback, cancellationToken, emitOnly, customTransformers, forceDtsEmit) {
                if (!forceDtsEmit) {
                    const result = handleNoEmitOptions(program2, sourceFile, writeFileCallback, cancellationToken);
                    if (result)
                        return result;
                }
                const emitResolver = getTypeChecker().getEmitResolver(outFile(options) ? void 0 : sourceFile, cancellationToken);
                mark("beforeEmit");
                const emitResult = emitFiles(emitResolver, getEmitHost(writeFileCallback), sourceFile, getTransformers(options, customTransformers, emitOnly), emitOnly, 
                /*onlyBuildInfo*/
                false, forceDtsEmit);
                mark("afterEmit");
                measure("Emit", "beforeEmit", "afterEmit");
                return emitResult;
            }