function parseDeclarationEncoding(stream, state) {
        state.tokenize = parseDeclarationStandalone;
        
        if(isTokenSeparated(stream) && stream.match(/^encoding( )*=( )*"[A-Za-z]([A-Za-z0-9._]|\-)*"/)) {
            return STYLE_INSTRUCTION;
        }
        return null;
    }