function shouldCommitMapping() {
                return !hasLast || lastGeneratedLine !== pendingGeneratedLine || lastGeneratedCharacter !== pendingGeneratedCharacter || lastSourceIndex !== pendingSourceIndex || lastSourceLine !== pendingSourceLine || lastSourceCharacter !== pendingSourceCharacter || lastNameIndex !== pendingNameIndex;
            }