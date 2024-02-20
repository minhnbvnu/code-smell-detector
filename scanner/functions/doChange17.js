function doChange17(changes, preferences, sourceFile, start, useHtmlEntity) {
            const character = sourceFile.getText()[start];
            if (!isValidCharacter(character)) {
                return;
            }
            const replacement = useHtmlEntity ? htmlEntity[character] : `{${quote(sourceFile, preferences, character)}}`;
            changes.replaceRangeWithText(sourceFile, { pos: start, end: start + 1 }, replacement);
        }