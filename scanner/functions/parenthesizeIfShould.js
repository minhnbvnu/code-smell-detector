function parenthesizeIfShould(text, shouldParenthesize) {
        return shouldParenthesize ? `(${text})` : text;
    }