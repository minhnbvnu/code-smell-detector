function processMapping(mapping) {
                const generatedPosition = generatedFile !== void 0 ? getPositionOfLineAndCharacter(generatedFile, mapping.generatedLine, mapping.generatedCharacter, 
                /*allowEdits*/
                true) : -1;
                let source;
                let sourcePosition;
                if (isSourceMapping(mapping)) {
                    const sourceFile = host.getSourceFileLike(sourceFileAbsolutePaths[mapping.sourceIndex]);
                    source = map2.sources[mapping.sourceIndex];
                    sourcePosition = sourceFile !== void 0 ? getPositionOfLineAndCharacter(sourceFile, mapping.sourceLine, mapping.sourceCharacter, 
                    /*allowEdits*/
                    true) : -1;
                }
                return {
                    generatedPosition,
                    source,
                    sourceIndex: mapping.sourceIndex,
                    sourcePosition,
                    nameIndex: mapping.nameIndex
                };
            }