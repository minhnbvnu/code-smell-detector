function $parseMarkupHelper(str, startIndex, stateChanges) {

    // Find the first unescaped {, or return if there is none
    let start = -1;
    do {
        start = str.indexOf('{', start + 1);
        if (start === -1) {
            // No markup found
            return str;
        }
    } while ((start !== 0) && (str[start - 1] === '\\'));

    // Find the *matching* close brace
    let end = start;
    let stack = 1;
    while (stack > 0) {
        let op = str.indexOf('{', end + 1); if (op === -1) { op = Infinity; }
        let cl = str.indexOf('}', end + 1); if (cl === -1) { cl = Infinity; }
        end = $Math.min(op, cl);
        
        if (end >= str.length) {
            $error('Unbalanced {} in draw_text() with markup');
        }
        
        if (str[end - 1] !== '\\') {
            // Not escaped
            switch (str[end]) {
            case '{': ++stack; break;
            case '}': --stack; break;
            }
        }
    }

    const before = str.substring(0, start);
    const after  = str.substring(end + 1);
    const markup = str.substring(start + 1, end);

    let wasColor = false;
    const oldState = stateChanges[stateChanges.length - 1];
    const newState = Object.assign({}, oldState);
    newState.startIndex = startIndex + start;

    // Parse the markup
    let text = markup.replace(/^\s*(color|shadow|outline)\s*:\s*(#[A-Fa-f0-9]+|(rgb|rgba|gray|hsv|hsva)\([0-9%., ]+\))\s*/, function (match, prop, value) {
        wasColor = true;
        if (value[0] === '#') {
            value = $parseHexColor(value.substring(1));
        } else {
            // Parse the color specification
            let i = value.indexOf('(');

            // (Could also use $parse's indexing arguments to avoid all of this string work)
            const type = value.substring(0, i).trim();
            const param = value.substring(i + 1, value.length - 1).split(',');
            // Parse all parameters
            for (let i = 0; i < param.length; ++i) { param[i] = $parse(param[i].trim()).result; }

            // Convert to a structure
            switch (type) {
            case 'rgb':  value = {r:param[0], g:param[1], b:param[2]}; break;
            case 'rgba': value = {r:param[0], g:param[1], b:param[2], a:param[3]}; break;
            case 'hsv':  value = {h:param[0], s:param[1], v:param[2]}; break;
            case 'hsva': value = {h:param[0], s:param[1], v:param[2], a:param[3]}; break;
            case 'gray': value = {h:param[0]}; break;
            }
        }
        newState[prop] = $colorToUint16(value);
        return '';
    });

    if (! wasColor) {
        // The argument is not a color literal. It should be an identifier,
        // so parse it in the same way as the compiler
        //
        // The identifier regexp here is copied from
        // pyxlscript-compiler.js identifierPattern and must be kept
        // in sync.
        text = markup.replace(/^\s*(font|color|shadow|outline)\s*:\s*([Δ]?(?:[_A-Za-z][A-Za-z_0-9]*|[αβγΔδζηθιλμρσϕφχψτωΩ][_0-9]*(?:_[A-Za-z_0-9]*)?))\s+/, function (match, prop, value) {
            let v = window[value];
            if (v === undefined) {
                $error('Global constant ' + value + ' used in draw_text markup is undefined.');
            } else if (prop === 'font' && v.$type !== 'font') {
                $error('Global constant ' + value + ' is not a font'); 
            } else if (prop !== 'font' && v.r === undefined && v.h === undefined) {
                $error('Global constant ' + value + ' is not a color');
            }

            if (prop !== 'font') {
                v = $colorToUint16(v);
            }
            
            newState[prop] = v;
            return '';
        });
    }

    // Construct the new result string
    
    // The before part cannot contain markup, so copy it directly
    str = before;

    // Recursively process the main body
    stateChanges.push(newState);
    text = $parseMarkupHelper(text, before.length + startIndex, stateChanges);
    str += text;
    
    // Restore the old state after the body
    const restoreState = Object.assign({}, oldState);
    restoreState.startIndex = before.length + text.length + startIndex;
    stateChanges.push(restoreState);

    // Is there more after the first markup?
    if (after !== '') {
        str += $parseMarkupHelper(after, restoreState.startIndex, stateChanges);
    }

    return str;
}