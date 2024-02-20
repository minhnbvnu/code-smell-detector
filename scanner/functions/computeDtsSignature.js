function computeDtsSignature(programOfThisState, sourceFile, cancellationToken, host, onNewSignature) {
                        programOfThisState.emit(sourceFile, (fileName, text, _writeByteOrderMark, _onError, sourceFiles, data) => {
                            Debug.assert(isDeclarationFileName(fileName), `File extension for signature expected to be dts: Got:: ${fileName}`);
                            onNewSignature(computeSignatureWithDiagnostics(programOfThisState, sourceFile, text, host, data), sourceFiles);
                        }, cancellationToken, 
                        /*emitOnlyDtsFiles*/
                        true, 
                        /*customTransformers*/
                        void 0, 
                        /*forceDtsEmit*/
                        true);
                    }