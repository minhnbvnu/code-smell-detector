function parseInterpolatedStrings(token){

            // run the MicroTokenizer to identify the template tags
            return _microTokenizer(token, /\{.*?}/g, function(match){
                return [_token(match[0], 's3')];
            });
        }