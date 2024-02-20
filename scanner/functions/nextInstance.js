function nextInstance(str, c, j, d) {
    if (d !== undefined) {
        // Two arguments; see which comes first
        const i0 = nextInstance(str, c, j);
        const i1 = nextInstance(str, d, j);
        if (i0 > -1) {
            if (i1 > -1) {
                return Math.min(i0, i1);
            } else {
                return i0;
            }
        } else {
            return i1;
        }
    }

    j = j || 0;
    
    const count = {'(':0,   '{':0,   '[':0};
    const match = {')':'(', '}':'{', ']':'['};
    let stack = 0;
    while (j < str.length) {
        const x = str[j];
        if (x in count) {
            ++count[x];
            ++stack;
        } else if (x in match) {
            --stack;
            if (--count[match[x]] < 0) {
                throw "Unbalanced parens while looking for '" + c + "'";
            }
        } else if ((x === c) && (stack === 0)) {
            return j;
        }
        ++j;
    }
    return -1;
}