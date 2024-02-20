function parseDeclarationVersion(stream, state) {
        state.tokenize = parseDeclarationEncoding;
        
        if(isTokenSeparated(stream) && stream.match(/^version( )*=( )*"([a-zA-Z0-9_.:]|\-)+"/)) {
            return STYLE_INSTRUCTION;
        }
        stream.skipToEnd();
        return STYLE_ERROR;
    }