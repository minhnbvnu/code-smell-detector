function isBacktrackingSourcePosition(sourceIndex, sourceLine, sourceCharacter) {
                return sourceIndex !== void 0 && sourceLine !== void 0 && sourceCharacter !== void 0 && pendingSourceIndex === sourceIndex && (pendingSourceLine > sourceLine || pendingSourceLine === sourceLine && pendingSourceCharacter > sourceCharacter);
            }