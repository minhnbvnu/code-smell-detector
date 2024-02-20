function parseProcessingInstructionBody(stream, state) {
        stream.eatWhile(/[^?]/);
        if(stream.eat("?")) {
            if(stream.eat(">")) {
                popContext(state);
                state.tokenize = state.context == null ? parseDocument : parseElementBlock;
            }
        }
        return STYLE_INSTRUCTION;
    }