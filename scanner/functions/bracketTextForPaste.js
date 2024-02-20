function bracketTextForPaste(text, bracketedPasteMode) {
    if (bracketedPasteMode) {
        return '\x1b[200~' + text + '\x1b[201~';
    }
    return text;
}