function consumeTopLevel(tokens, types, options) {
            var ref$, type, structure, origTokens, result, finalResult, x$, y$;
            ref$ = types[0], type = ref$.type, structure = ref$.structure;
            origTokens = tokens.concat();
            if (!options.explicit && types.length === 1 && ((!type && structure) || (type === 'Array' || type === 'Object'))) {
                result = structure === 'array' || type === 'Array'
                    ? consumeArray(tokens, tokens[0] === '[')
                    : structure === 'tuple'
                        ? consumeTuple(tokens, tokens[0] === '(')
                        : consumeFields(tokens, tokens[0] === '{');
                finalResult = tokens.length ? consumeElement(structure === 'array' || type === 'Array'
                    ? (x$ = origTokens, x$.unshift('['), x$.push(']'), x$)
                    : (y$ = origTokens, y$.unshift('('), y$.push(')'), y$)) : result;
            }
            else {
                finalResult = consumeElement(tokens);
            }
            return finalResult;
        }