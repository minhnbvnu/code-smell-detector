function emitPos(pos) {
                if (sourceMapsDisabled || positionIsSynthesized(pos) || isJsonSourceMapSource(sourceMapSource)) {
                    return;
                }
                const { line: sourceLine, character: sourceCharacter } = getLineAndCharacterOfPosition(sourceMapSource, pos);
                sourceMapGenerator.addMapping(writer.getLine(), writer.getColumn(), sourceMapSourceIndex, sourceLine, sourceCharacter, 
                /*nameIndex*/
                void 0);
            }