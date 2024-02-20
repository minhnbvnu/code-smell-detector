function sameMapping(left, right) {
            return left === right || left.generatedLine === right.generatedLine && left.generatedCharacter === right.generatedCharacter && left.sourceIndex === right.sourceIndex && left.sourceLine === right.sourceLine && left.sourceCharacter === right.sourceCharacter && left.nameIndex === right.nameIndex;
        }