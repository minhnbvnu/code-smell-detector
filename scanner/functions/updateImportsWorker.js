function updateImportsWorker(sourceFile, changeTracker, updateRef, updateImport2) {
            for (const ref of sourceFile.referencedFiles || emptyArray) {
                const updated = updateRef(ref.fileName);
                if (updated !== void 0 && updated !== sourceFile.text.slice(ref.pos, ref.end))
                    changeTracker.replaceRangeWithText(sourceFile, ref, updated);
            }
            for (const importStringLiteral of sourceFile.imports) {
                const updated = updateImport2(importStringLiteral);
                if (updated !== void 0 && updated !== importStringLiteral.text)
                    changeTracker.replaceRangeWithText(sourceFile, createStringRange(importStringLiteral, sourceFile), updated);
            }
        }