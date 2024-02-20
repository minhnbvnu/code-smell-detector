function addMapping(generatedLine, generatedCharacter, sourceIndex, sourceLine, sourceCharacter, nameIndex) {
                Debug.assert(generatedLine >= pendingGeneratedLine, "generatedLine cannot backtrack");
                Debug.assert(generatedCharacter >= 0, "generatedCharacter cannot be negative");
                Debug.assert(sourceIndex === void 0 || sourceIndex >= 0, "sourceIndex cannot be negative");
                Debug.assert(sourceLine === void 0 || sourceLine >= 0, "sourceLine cannot be negative");
                Debug.assert(sourceCharacter === void 0 || sourceCharacter >= 0, "sourceCharacter cannot be negative");
                enter();
                if (isNewGeneratedPosition(generatedLine, generatedCharacter) || isBacktrackingSourcePosition(sourceIndex, sourceLine, sourceCharacter)) {
                    commitPendingMapping();
                    pendingGeneratedLine = generatedLine;
                    pendingGeneratedCharacter = generatedCharacter;
                    hasPendingSource = false;
                    hasPendingName = false;
                    hasPending = true;
                }
                if (sourceIndex !== void 0 && sourceLine !== void 0 && sourceCharacter !== void 0) {
                    pendingSourceIndex = sourceIndex;
                    pendingSourceLine = sourceLine;
                    pendingSourceCharacter = sourceCharacter;
                    hasPendingSource = true;
                    if (nameIndex !== void 0) {
                        pendingNameIndex = nameIndex;
                        hasPendingName = true;
                    }
                }
                exit();
            }