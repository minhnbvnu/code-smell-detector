function captureMapping(hasSource, hasName) {
                return {
                    generatedLine,
                    generatedCharacter,
                    sourceIndex: hasSource ? sourceIndex : void 0,
                    sourceLine: hasSource ? sourceLine : void 0,
                    sourceCharacter: hasSource ? sourceCharacter : void 0,
                    nameIndex: hasName ? nameIndex : void 0
                };
            }