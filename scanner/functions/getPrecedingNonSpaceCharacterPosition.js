function getPrecedingNonSpaceCharacterPosition(text, position) {
            while (position > -1 && isWhiteSpaceSingleLine(text.charCodeAt(position))) {
                position -= 1;
            }
            return position + 1;
        }