function microTokenizer(token, regex, cb){

    // list of sub-tokens to return
    const subTokens = [];

    // last token position
    let lastTokenEnd = 0;

    // the current match
    let match;

    // find ALL possible matches
    while ((match = regex.exec(token.text)) != null){

        // unmatched text between tokens ?
        if (lastTokenEnd < match.index ){
            // create new start text token
            subTokens.push(_token(token.text.substring(lastTokenEnd, match.index), token.type, null, lastTokenEnd));
        }

        // process current match
        const t = cb(match, token.type) || [];

        // add high-level processed tokens
        for (let i=0;i< t.length;i++){
            subTokens.push(t[i]);
        }

        // next regex offset
        lastTokenEnd = match.index + match[0].length;

        // overrides the usual regex behaviour of not matching results that overlap
        regex.lastIndex = lastTokenEnd;
    }

    // subtokens created ? otherwise return original token
    if (subTokens.length == 0){
        return [token];
    }else{
        // text fragments complete ? or is the final one missing ?
        if (lastTokenEnd < token.text.length){
            subTokens.push(_token(token.text.substring(lastTokenEnd), token.type, null, lastTokenEnd));
        }

        return subTokens;
    }
}