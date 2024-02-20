function tryGetGeneratedPosition(info) {
                if (isDeclarationFileName(info.fileName))
                    return void 0;
                const sourceFile = getSourceFile(info.fileName);
                if (!sourceFile)
                    return void 0;
                const program = host.getProgram();
                if (program.isSourceOfProjectReferenceRedirect(sourceFile.fileName)) {
                    return void 0;
                }
                const options = program.getCompilerOptions();
                const outPath = outFile(options);
                const declarationPath = outPath ? removeFileExtension(outPath) + ".d.ts" /* Dts */ : getDeclarationEmitOutputFilePathWorker(info.fileName, program.getCompilerOptions(), currentDirectory, program.getCommonSourceDirectory(), getCanonicalFileName);
                if (declarationPath === void 0)
                    return void 0;
                const newLoc = getDocumentPositionMapper2(declarationPath, info.fileName).getGeneratedPosition(info);
                return newLoc === info ? void 0 : newLoc;
            }