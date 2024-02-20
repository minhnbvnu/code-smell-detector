function parseAttribute(stream, state) {
        var quote = stream.next();
        if(quote != "\"" && quote != "'") {
            // attribute must be quoted
            stream.skipToEnd();
            state.tokenize = parseElement;
            return STYLE_ERROR;
        }
        
        state.tokParams.quote = quote;    
        state.tokenize = parseAttributeValue;
        return STYLE_WORD;
    }