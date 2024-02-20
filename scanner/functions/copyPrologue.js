function copyPrologue(source, target, ensureUseStrict2, visitor) {
                const offset = copyStandardPrologue(source, target, 0, ensureUseStrict2);
                return copyCustomPrologue(source, target, offset, visitor);
            }