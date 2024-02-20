function protectObjectSpread(src) {
    // Because this version of the esprima parser does not support the
    // spread operator on objects (due to a bug), we temporarily hide
    // the spread operator inside `{}` by the transformation:
    //
    // {a, ...b, c} --> {a, ⏓:b, c}
    //
    // Note that at this point in the program, all object literals
    // have been reduced to single-line expressions, which limits how
    // far we have to search, and quoted strings are already
    // protected.

    const close = {'(':')', '{':'}', '[':']'};
    return src.replace(/(\{.*)\.\.\./g, function (match, prefix) {
        // Verify that the match does not contain unmatched [], (), {}
        // between the curly brace and the ellipsis. If it does, then
        // the ellipsis is not intended for the object expansion and
        // is an array ellipis that should be unmodified.
        //
        // Search backwards through the prefix. If the stack is empty
        // and we hit {, then we're in an object. Any other case assume
        // is an array.
        for (let i = prefix.length - 1, stack = []; i >= 0; --i) {
            const c = prefix[i];
            if ((stack.length === 0) && (c === '{')) {
                // Was an object
                return prefix + "'⏓':";
            }

            switch (c) {
            case ')': case '}': case ']': stack.push(c); break;
                
            case '(': case '[': case '{':
                if (stack.pop() !== close[c]) {
                    // Unbalanced brackets. Was not an object
                    return match;
                }
            }
        }

        // Will reach here for illegal statements, e.g., "{}..."
        return match;
    });
}