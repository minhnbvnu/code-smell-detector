function isNewGeneratedPosition(generatedLine, generatedCharacter) {
                return !hasPending || pendingGeneratedLine !== generatedLine || pendingGeneratedCharacter !== generatedCharacter;
            }