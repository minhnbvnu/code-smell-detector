function getFirstNonSpaceCharacterPosition(text, position) {
            while (isWhiteSpaceLike(text.charCodeAt(position))) {
                position += 1;
            }
            return position;
        }