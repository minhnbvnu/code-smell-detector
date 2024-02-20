function parseXmlAttributes(token){
            // run the MicroTokenizer to identify the name=value match
            return _microTokenizer(token, /\b([^\s\0"'>/=]+)(\s*=\s*)((['"]).*?\4|[^'" \t]+)/gi, function(match){
                // attribute name | assignment operator | attribute value (string)
                return [_token(match[1], 'x2'), _token(match[2], 'k3'), _token(match[3], 's0')];
            });
        }