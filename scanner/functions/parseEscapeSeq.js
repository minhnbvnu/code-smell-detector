function parseEscapeSeq(token){

            // run the MicroTokenizer to process escape sequences
            return _microTokenizer(token, /\\(x[A-F0-9]{2}|u[A-F0-9]{4}|.)/gi, function(match){
                // single escape sequence token
                return [_token(match[0], 's4')];
            });
        }