function parseTemplateSeq(token){

            // run the MicroTokenizer to identify the template tags
            return _microTokenizer(token, /\$(?:\w+|\(.*?\))/g, function(match){
                return [_token(match[0], 'k7')];
            });
        }