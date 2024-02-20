function findAllMatches(code, rule, priority){
    // token list
    const tokens = [];
    
    // current match
    let match;

    // iteration counter
    let iterationCounter = 0;

    // find ALL possible matches
    while ((match = rule.regex.exec(code)) != null){
        // increment counter
        iterationCounter++;

        // throw an error on > 50k tokens - seems to be a infinite loop which may crash the browser!
        if (iterationCounter > 50000){
            throw new Error('Infinite tokenizer loop detected; more than 50k tokens - language rule [' + priority + '] ' +  rule.regex + ' seems to be broken');
        }

        // ignore empty matches
        if (match[0].length == 0){
            continue;
        }

        // overrides the usual regex behaviour of not matching results that overlap
        // normally it should be only +1.
        // to optimize the matching performance, we skip thrid of the result length and start the new matching
        rule.regex.lastIndex = match.index + 1 + match[0].length/3;

        // default type - first element
        const defaultType = (Array.isArray(rule.type)) ? rule.type[0] : rule.type;

        // default filter - first element
        const defaultFilter = ((Array.isArray(rule.filter)) ? rule.filter[0] : rule.filter) || null;

        // matching group used ?
        if (match.length > 1){

            // match indexOf offset
            let offset = 0;
            
            // process each matching group as single token
            for (let i=1;i<match.length;i++){

                // valid match ?
                if (match[i]){
                    // is array ? get nth type
                    const type = (Array.isArray(rule.type) && rule.type.length >= i) ? rule.type[i-1] : defaultType;

                    // is array ? get nth type
                    const filter = (Array.isArray(rule.filter) && rule.filter.length >= i) ? rule.filter[i-1] : defaultFilter;

                    // get match index - avoid overlapping using offset
                    const matchPosition = match[0].indexOf(match[i], offset);

                    // set new offset
                    offset = matchPosition;

                    // create new token
                    tokens.push(_token(match[i], type, filter, match.index + matchPosition, priority));
                }
            }
        }else{
            // use full pattern matching
            tokens.push(_token(match[0], defaultType, defaultFilter, match.index, priority));
        }
    }

    return tokens;
}