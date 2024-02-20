function popMarkdown() {
        return popNodes().map(x => x.toMarkdown()).join('');
    }