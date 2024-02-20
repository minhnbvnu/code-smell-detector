function parseDeclarationEndTag(stream, state) {
        state.tokenize = parseDocument;
        
        if(stream.match("?>") && stream.eol()) {
            popContext(state);
            return STYLE_INSTRUCTION;
        }
        stream.skipToEnd();
        return STYLE_ERROR;
    }