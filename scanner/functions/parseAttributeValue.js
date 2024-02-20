function parseAttributeValue(stream, state) {
        var ch = "";
        while(!stream.eol()) {
            ch = stream.next();
            if(ch == state.tokParams.quote) {
                // end quote found
                state.tokenize = parseElement;
                return STYLE_WORD;
            } else if(ch == "<") {
                // can't have less-than signs in an attribute value, ever
                stream.skipToEnd()
                state.tokenize = parseElement;
                return STYLE_ERROR;
            } else if(ch == "&") {
                // reference - look for a semi-colon, or return error if none found
                ch = stream.next();
                
                // make sure that semi-colon isn't right after the ampersand
                if(ch == ';') {
                    stream.skipToEnd()
                    state.tokenize = parseElement;
                    return STYLE_ERROR;
                }
                
                // make sure no less-than characters slipped in
                while(!stream.eol() && ch != ";") {
                    if(ch == "<") {
                        // can't have less-than signs in an attribute value, ever
                        stream.skipToEnd()
                        state.tokenize = parseElement;
                        return STYLE_ERROR;
                    }
                    ch = stream.next();
                }
                if(stream.eol() && ch != ";") {
                    // no ampersand found - error
                    stream.skipToEnd();
                    state.tokenize = parseElement;
                    return STYLE_ERROR;
                }                
            }
        }
        
        // attribute value continues to next line
        return STYLE_WORD;
    }