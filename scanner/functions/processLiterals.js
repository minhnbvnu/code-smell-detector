function processLiterals(token){

            // is regex ?
            if (token.text.match(/^%r/)){
                token.type = 'e2';
            }else if (token.text.match(/^%x/)){
                token.type = 'e4';
            }

            return [token];
        }