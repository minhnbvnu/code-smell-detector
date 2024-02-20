function getFileEmitOutput(program, sourceFile, emitOnlyDtsFiles, cancellationToken, customTransformers, forceDtsEmit) {
            const outputFiles = [];
            const { emitSkipped, diagnostics } = program.emit(sourceFile, writeFile2, cancellationToken, emitOnlyDtsFiles, customTransformers, forceDtsEmit);
            return { outputFiles, emitSkipped, diagnostics };
            function writeFile2(fileName, text, writeByteOrderMark) {
                outputFiles.push({ name: fileName, writeByteOrderMark, text });
            }
        }