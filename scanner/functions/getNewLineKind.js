function getNewLineKind(newLineCharacter) {
            return newLineCharacter === "\n" ? 1 /* LineFeed */ : 0 /* CarriageReturnLineFeed */;
        }