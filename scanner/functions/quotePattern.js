function quotePattern(text) {
        return text.replace(/([\^$(){}+*?\-|\[\]\:\\])/g, '\\$1');
    }