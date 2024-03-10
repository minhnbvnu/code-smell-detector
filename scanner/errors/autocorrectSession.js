function autocorrectSession(session) {
    const position = aceEditor.getCursorPosition();

    // The current row, including the just-typed character
    let src = session.getTextRange(new ace.Range(position.row, 0, position.row, position.column + 1));

    // ace.js represents the newline as reporting one past the end of the actual range,
    // even though it will draw the cursor on the *next* line.
    if (src.length === position.column) {
        src += '\n';
    }

    if ((src.length === 0) || (/[0-9A-Za-z_|=\-^]/.test(src[src.length - 1]) && ! src.endsWith('Delta') && ! src.endsWith('...'))) {
        // The last character is not a symbol-breaking character, so return immediately
        return;
    }
    
    // See if there are an odd number of double quotes on this row up to this point.
    let quotes = 0;
    for (let i = 0; i < src.length - 1; ++i) {
        if (src[i] === '"') { ++quotes; }
    }
    if (quotes & 1) {
        // There's an odd number of quotes...we must be in a quoted string, so
        // disable autocorrect
        return;
    }

    let target, replacement;

    const lastChar = src[src.length - 1];
    if (lastChar === ')') {
        // Check for special functions. These are weird because we want them to
        // trigger right on the closing paren instead of waiting for the next character,
        // as they are unambiguous immediately after typing.
        for (let i = 0; i < autocorrectFunctionTable.length; i += 2) {
            target = autocorrectFunctionTable[i];
            // Look for a breaking character before the target sequence
            if (((src.length === target.length) ||
                 ((src.length > target.length) &&
                  /[ +\-\.\t\n,:()\[\]]/.test(src[src.length - target.length - 1]))) &&
                src.endsWith(target)) {
                replacement = autocorrectFunctionTable[i + 1];

                session.replace(new ace.Range(position.row, position.column - target.length + 1, position.row, position.column + 1), replacement);
                // Advance the cursor to the end over the replacement
                aceEditor.gotoLine(position.row + 1, position.column - target.length + replacement.length + 1, false)
                return;
            }
        }        
    }

    // Replace Delta immediately on typing the 'a'
    if (! replacement && lastChar === 'a') {
        // Look for a breaking character before the target sequence
        if (src.endsWith('Delta') && ((src.length === 'Delta'.length) || /[ +\-\.\t\n,\|:()\[\]⌊⌋⌈⌉]/.test(src[src.length - 'Delta'.length - 1]))) {
            replacement = 'Δ';
            target = 'Delta';
            
            session.replace(new ace.Range(position.row, position.column - target.length + 1, position.row, position.column + 1), replacement);
            // Advance the cursor to the end over the replacement
            aceEditor.gotoLine(position.row + 1, position.column - target.length + replacement.length + 1, false)
            return;
        }
    }


    if (! replacement && lastChar === '.' && src.endsWith('...')) {
        replacement = '…';
        target = '...';
        
        session.replace(new ace.Range(position.row, position.column - target.length + 1, position.row, position.column + 1), replacement);
        // Advance the cursor to the end over the replacement
        aceEditor.gotoLine(position.row + 1, position.column - target.length + replacement.length + 1, false)
        return;
    }

    
    if (! replacement) {
        // Strip the last character, which will not be part of the autocorrect.
        src = src.substring(0, src.length - 1);
        
        // Look for any possible match in substr.
        for (let i = 0; i < autocorrectTable.length; i += 2) {
            target = autocorrectTable[i];
            
            // Look for a breaking character before the target sequence
            if (((src.length === target.length) ||
                 ((src.length > target.length) &&
                  ((target[0] === '^') || // exponents don't need to be broken
                   /[ +\-\.\t\n,\|:()\[\]∅ΓΨΩΦΣΠΞΛΘΔαβγδεζηθικλμνξπρστυϕχψω]/.test(src[src.length - target.length - 1])))) &&
                src.endsWith(target)) {
                replacement = autocorrectTable[i + 1];                
                break;
            }
        } // for each autocorrect choice
    }

    // Degrees are a very special case. We need to search backwards for
    // the previous breaking character, and then check if we're looking
    // at a number followed by 'deg'
    if (! replacement && /(^|[^A-Za-z_])[\.0-9½⅓⅔¼¾⅕⅖⅗⅘⅙⅐⅛⅑⅒]+deg$/.test(src)) {
        target = 'deg';
        replacement = '°';
    }

    // Mode line
    if (! replacement && /^={5,}$/.test(src)) {
        target = src;
        replacement = '═'.repeat(src.length);
    }

    // Event line
    if (! replacement && /^-{5,}$/.test(src)) {
        target = src;
        replacement = '─'.repeat(src.length);
    }
    
    if (replacement) {
        session.replace(new ace.Range(position.row, position.column - target.length, position.row, position.column), replacement);
        
        // Advance the cursor to the end over the replacement. Ace
        // does not appear to have processed at the editor level that
        // the session has just changed, so it will be off by one in
        // the goto line when the before/after code has different
        // lengths. So, we delay positioning until after the editor
        // has processed the replace.
        setTimeout(function() {
            aceEditor.gotoLine(position.row + 1, position.column - target.length + replacement.length + 1, false)
        });
    }
}