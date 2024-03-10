function $unparseContainer(x, alreadySeen, colon, closingBraceOnNewLine,
                           inlineShortContainers, terse, indent, hint, specialStructs, meta = {}) {

    const INCREASE_INDENT = '    ';
    const MAX_INLINE_CONTAINER_LENGTH = 4;

    const isArray = Array.isArray(x);

    alreadySeen.set(x, true);
    
    let s = '';
    
    let first = true;
    
    let numPublicKeys = 0;
    let inline = inlineShortContainers;
    
    const keys = isArray ? undefined : $Object.keys(x);
    const N = isArray ? x.length : keys.length;
    
    for (let i = 0; i < N; ++i) {
        const k = isArray ? i : keys[i];
        if (isArray || k !== '$') {
            ++numPublicKeys;
            const v = x[k];
            if (numPublicKeys > MAX_INLINE_CONTAINER_LENGTH ||
                Array.isArray(v) ||
                typeof v === 'object') {
                // Too large or recursive value
                inline = false;
            }
        }
    }

    meta.expandable = N > 0 && ! inline && specialStructs;

    // Are child nodes expanded by default?
    const childExpansionClass = (N > 5 || indent.length >= INCREASE_INDENT.length) ? 'class="closed"' : '';
    
    let childMeta = {};
    const childIndent = INCREASE_INDENT + indent;
    for (let i = 0; i < N; ++i) {
        const k = isArray ? i : keys[i];
        // Hide quadplay-internal members
        if (isArray || k[0] !== '$') {
            let key;
            
            // Quote illegal identifiers used as keys
            if (! isArray) {
                const legalIdentifier = /^[Δ]?(?:[A-Za-z][A-Za-z_0-9]*|[αβγδζηθιλμρσϕφχψτωΩ][_0-9]*)$/.test(k);
                key = legalIdentifier ? k : ('"' + k + '"');
            }
            
            // Close out previous
            if (first) {
                if (! inline) {
                    if (specialStructs) {
                        s += '<span class="hidden">\n' + childIndent + '</span>';
                    } else {
                        s += '\n' + childIndent;
                    }
                }
                first = false;
            } else if (inline) {
                // Separator
                s += (terse ? ',' : ', ');
            } else if (specialStructs) {
                s += ',</li><span class="hidden">\n' + childIndent + '</span>';
            } else {
                s += ',\n' + childIndent;
            }

            // For arrays, pass the array's hint as the hint
            childMeta.expandable = false;
            const child = $unparse(x[k], alreadySeen, colon, closingBraceOnNewLine, inlineShortContainers, terse, childIndent, isArray ? hint : k, specialStructs, childMeta);

            if (specialStructs && ! inline) {
                s += `<li ${childExpansionClass}><span onclick="onExpanderClick(event)" class="expanderButton" style="visibility: ${childMeta.expandable ? 'visible' : 'hidden'}"></span>`;
            }
            
            if (! isArray) {
                s += key + colon;
            }

            s += child;
        }
    }
    
    if (numPublicKeys > 0 && specialStructs && ! inline) { s += '</li>'; }
    
    if (numPublicKeys > 0 && closingBraceOnNewLine && ! inline) {
        if (specialStructs) {
            s += '<span class="hidden">\n' + indent + '</span>';
        } else {
            s += '\n' + indent;
        }
    }

    if (specialStructs && ! inline) {
        s = '<ul>' + s + '</ul><span onclick="onExpanderClick(event)" class="expanderEllipses"></span>';
    }

    if (isArray) {
        s = '[' + s + ']';
    } else {
        s = '{' + s + '}';
    }
    
    return s;
}