function parseDeclarationStandalone(stream, state) {
        state.tokenize = parseDeclarationEndTag;
        
        if(isTokenSeparated(stream) && stream.match(/^standalone( )*=( )*"(yes|no)"/)) {
            return STYLE_INSTRUCTION;
        }
        return null;
    }