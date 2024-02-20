function leftFactoring(grammar) {
    'use strict';
    var i, j, k, l,
        generation,
        longest,
        hasPrefix,
        helperName,
        keys = Object.keys(grammar);

    function arrayEqual(a, b) {
        var idx;
        if (a.length !== b.length) {
            return false;
        }
        for (idx = 0; idx < a.length; idx += 1) {
            if (a[idx] !== b[idx]) {
                return false;
            }
        }
        return true;
    }

    for (i = 0; i < keys.length; i += 1) {
        helperName = keys[i] + "'";
        hasPrefix = true;
        while (hasPrefix) {
            hasPrefix = false;
            longest = [];
            generation = grammar[keys[i]];
            for (j = 0; j < generation.length; j += 1) {
                for (k = j + 1; k < generation.length; k += 1) {
                    for (l = 0; l < generation[j].length && l < generation[k].length; l += 1) {
                        if (generation[j][l] !== generation[k][l]) {
                            break;
                        }
                    }
                    if (l > 0) {
                        hasPrefix = true;
                        if (l > longest.length) {
                            longest = generation[j].slice(0, l);
                        }
                    }
                }
            }
            if (hasPrefix) {
                while (grammar.hasOwnProperty(helperName)) {
                    helperName += "'";
                }
                grammar[helperName] = [];
                for (j = 0, k = 0; k < generation.length; k += 1) {
                    if (generation[k].length >= longest.length && arrayEqual(generation[k].slice(0, longest.length), longest)) {
                        if (generation[k].length === longest.length) {
                            grammar[helperName].push(['ϵ']);
                        } else {
                            grammar[helperName].push(generation[k].slice(longest.length));
                        }
                    } else {
                        grammar[keys[i]][j] = grammar[keys[i]][k];
                        j += 1;
                    }
                }
                grammar[keys[i]] = [longest.concat([helperName])].concat(grammar[keys[i]].slice(0, j));
            }
        }
    }
    return grammar;
}