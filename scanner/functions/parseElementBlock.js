function parseElementBlock(stream, state) {
        if(stream.eat("<")) {
            if(stream.match("?")) {
                pushContext(state, TAG_INSTRUCTION);
                state.tokenize = parseProcessingInstructionStartTag;
                return STYLE_INSTRUCTION;
            } else if(stream.match("!--")) {
                // new context: comment
                pushContext(state, TAG_COMMENT);
                return chain(stream, state, inBlock(STYLE_COMMENT, "-->",
                    state.context == null ? parseDocument : parseElementBlock));
            } else if(stream.match("![CDATA[")) {
                // new context: CDATA section
                pushContext(state, TAG_CDATA);
                return chain(stream, state, inBlock(STYLE_TEXT, "]]>",
                    state.context == null ? parseDocument : parseElementBlock));
            } else if(stream.eatSpace() || stream.eol() ) {
                stream.skipToEnd();
                return STYLE_ERROR;
            } else {
                // element
                state.tokenize = parseElementTagName;
                return STYLE_ELEMENT_NAME;
            }
        } else if(stream.eat("&")) {
            stream.eatWhile(/[^;]/);
            stream.eat(";");
            return STYLE_ENTITIES;
        } else {
            // new context: text
            pushContext(state, TAG_TEXT);
            state.tokenize = parseText;
            return null;
        }
        
        state.tokenize = state.context == null ? parseDocument : parseElementBlock;
        stream.skipToEnd();
        return null;
    }