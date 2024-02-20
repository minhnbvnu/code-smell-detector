function getEmitOutput(fileName, emitOnlyDtsFiles, forceDtsEmit) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                const customTransformers = host.getCustomTransformers && host.getCustomTransformers();
                return getFileEmitOutput(program, sourceFile, !!emitOnlyDtsFiles, cancellationToken, customTransformers, forceDtsEmit);
            }