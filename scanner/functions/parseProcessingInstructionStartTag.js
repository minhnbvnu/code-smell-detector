function parseProcessingInstructionStartTag(stream, state) {
        if(stream.match("xml", true, true)) {
            // xml declaration
            if(state.lineNumber > 1 || stream.pos > 5) {
                state.tokenize = parseDocument;
                stream.skipToEnd();
                return STYLE_ERROR;
            } else {
                state.tokenize = parseDeclarationVersion;
                return STYLE_INSTRUCTION;
            }
        }

        // regular processing instruction
        if(isTokenSeparated(stream) || stream.match("?>")) {
            // we have a space after the start-tag, or nothing but the end-tag
            // either way - error!
            state.tokenize = parseDocument;
            stream.skipToEnd();
            return STYLE_ERROR;
        }

        state.tokenize = parseProcessingInstructionBody;
        return STYLE_INSTRUCTION;
    }