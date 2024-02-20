function replaceRef(match, idx) {
                    if (arg[idx] == null) throw Error('Reference ' + idx + 'is undefined');
                    return arg[idx];
                }