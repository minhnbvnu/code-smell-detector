function storeHighlighter(highlighter)
    {
        sh.vars.highlighters[getHighlighterId(highlighter.id)] = highlighter;
    }