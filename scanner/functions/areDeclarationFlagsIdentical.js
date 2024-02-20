function areDeclarationFlagsIdentical(left, right) {
                if (left.kind === 166 /* Parameter */ && right.kind === 257 /* VariableDeclaration */ || left.kind === 257 /* VariableDeclaration */ && right.kind === 166 /* Parameter */) {
                    return true;
                }
                if (hasQuestionToken(left) !== hasQuestionToken(right)) {
                    return false;
                }
                const interestingFlags = 8 /* Private */ | 16 /* Protected */ | 512 /* Async */ | 256 /* Abstract */ | 64 /* Readonly */ | 32 /* Static */;
                return getSelectedEffectiveModifierFlags(left, interestingFlags) === getSelectedEffectiveModifierFlags(right, interestingFlags);
            }