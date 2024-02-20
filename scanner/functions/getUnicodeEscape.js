function getUnicodeEscape(character) {
        return `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`;
    }