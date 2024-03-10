function $unparse(x, alreadySeen, colon, closingBraceOnNewLine,
                  inlineShortContainers, terse, indent, hint, specialStructs, meta = {}) {

    if (x && x.$name !== undefined) {
        // Internal object
        const editable = ['font', 'spritesheet', 'sound', 'data', 'map'];
        if (specialStructs && editable.indexOf(x.$type) !== -1) {
            return `<a style="cursor:pointer; font-family: Arial" onclick="onProjectSelect(document.getElementById('projectAsset_${x.$name}'), 'asset', gameSource.assets['${x.$name}'])">${x.$name}</a>`;
        } else {
            return x.$name;
        }
    }
    
    if (Array.isArray(x)) {
        if (alreadySeen.has(x)) {
            return '[…]';
        } else {        
            return $unparseContainer(x, alreadySeen, colon, closingBraceOnNewLine,
                                     inlineShortContainers, terse, indent, hint, specialStructs, meta);
        }
    }

    
    switch (typeof x) {
    case 'object':
        if (x === null) {
            return '∅';
        } else if (alreadySeen.has(x)) {
            return '{…}';
        } else {
            if (specialStructs && $isSimplePyxlScriptStruct(x)) {
                // Position types
                for (let j = 0; j < $unparse.pos_struct_array.length; ++j) {
                    const type = $unparse.pos_struct_array[j];
                    if ($isSimplePyxlScriptStruct(x, type)) {
                        let s = type + '(';
                        for (let i = 0; i < type.length; ++i) {
                            s += $unparseFixedDecimal(x[type[i]], 4) +
                                ((i < type.length - 1) ? ', ' : ')');
                        }
                        return s;
                    }
                }
                
                // Color types
                for (let j = 0; j < $unparse.color_struct_array.length; ++j) {
                    const type = $unparse.color_struct_array[j];
                    if ($isSimplePyxlScriptStruct(x, type)) {
                        let s = type + '(';

                        // Show percentages
                        for (let i = 0; i < type.length; ++i) {
                            s += format_number(x[type[i]], '0%') +
                                ((i < type.length - 1) ? ', ' : ')');
                        }

                        let color = s;
                        if (type[0] === 'h') {
                            // HSV -> RGB
                            const c = rgb(x);
                            c.a = (type[3] === 'a') ? x.a : 1;
                            color = `rgba(${100 * c.r}%, ${100 * c.g}%, ${100 * c.b}%, ${100 * c.a}%)`;
                        }
                        
                        s += ` <div style="display:inline-block; width: 32px; height: 12px; overflow: hidden; position: relative; top: 2px" class="checkerboard8"><div style="background: ${color}; width: 32px; height: 12px"></div></div>`;
                        return s;
                    }
                }
            }
            
            return $unparseContainer(x, alreadySeen, colon, closingBraceOnNewLine,
                                     inlineShortContainers, terse, indent, hint, specialStructs, meta);
        }

    case 'boolean':
        return x ? 'true' : 'false';
        
    case 'number':
        let match;
        if (x === Infinity) {
            return '∞';
        } else if (x === -Infinity) {
            return '-∞';
        } else if (is_nan(x)) {
            return 'nan';
        } else if (specialStructs && (/(^|_|\.)Δ?(angle|heading|theta|phi|yaw|pitch|roll|θ|ϕ|Φ|Θ)(_array)?$/i.test(hint))) {
            if ($Math.abs(x) < 25 * $Math.PI / 180) {
                return format_number(x, '0.0deg');
            } else {
                return format_number(x, 'deg');
            }
        } else if (specialStructs && (/(^|_|\.)Δ?(percent|percentage|opacity|fraction|alpha|beta|α|β)(_array)?$/i.test(hint))) {
            if ($Math.abs(x) < 0.05) {
                return format_number(x, '0.0%');
            } else {
                return format_number(x, '%');
            }
        } else if (x === $Math.PI) {
            return 'π';
        } else if (x === $Math.PI / 2) {
            return '½π';
        } else if (x === $Math.PI / 4) {
            return '¼π';
        } else if (x === $Math.PI * 3 / 4) {
            return '¾π';
        } else if (x === -$Math.PI) {
            return '-π';
        } else if (x === -$Math.PI / 2) {
            return '-½π';
        } else if (x === -$Math.PI / 4) {
            return '-¼π';
        } else if (x === -$Math.PI * 3 / 4) {
            return '-¾π';
        } else {
            return '' + x;
        }

    case 'undefined':
        return '∅';
        
    case 'string':
        if (specialStructs) { x = $escapeHTMLEntities(x); }
        return '"' + x + '"';

    case 'function':
        if (x.name) {
            return 'function ' + x.name;
        } else {
            return 'function';
        }

    default:
        return '{builtin}';
    }
}