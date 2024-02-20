function format_number(n, fmt) {
    if (fmt !== undefined && ! is_string(fmt)) { $error('The format argument to format_number must be a string'); }
    if (! is_number(n)) { $error('The number argument to format_number must be a number'); }

    let addPlus = /^ *\+/.test(fmt);
    if (addPlus) {
        fmt = fmt.replace('+', '');
        if (n < 0) { addPlus = false; }
    }

    let s;
    switch (fmt) {
    case 'percent':
    case '%':
        s = $Math.round(n * 100) + '%';
        break;
    case 'commas':
    case ',':
        s = n.toLocaleString('en');
        break;
    case 'spaces':
        s = n.toLocaleString('fr');
        break;
    case 'binary':
        s ='0b' + n.toString(2);
        break;
    case 'degrees':
    case '°':
    case 'deg':
        s = $Math.round(n * 180 / $Math.PI) + '°';
        break;
        
    case '0.#°':
    case '0.#deg':
        // Special case of optional decimal
        s = $unparseFixedDecimal(n * 180 / $Math.PI, 1) + '°';
        break;

    case 'fraction':
        {
            s = n < 0 ? '-' : '';
            const eps = 1e-10;
            n = $Math.abs(n);
            const frac = [1/4, '¼', 1/2, '½', 3/4, '¾', 1/3, '⅓', 2/3, '⅔', 1/5, '⅕'];
            for (let i = 0; i < frac.length; i += 2) {
                if ($Math.abs(frac[i] - n) < eps) {
                    return s + frac[i + 1];
                }
            }
            for (let denom = 2; denom <= 10; ++denom) {
                for (let numer = 1; numer < denom; ++numer) {
                    if ($Math.abs(numer / denom - n) < eps) {
                        return s + numer + '/' + denom;
                    }
                }
            }
            s += n;
        }
        break;
        
    case 'hex':
        if ($Math.abs(n) === Infinity) {
            s = n.toLocaleString('en');
        } else {
            s = '0x' + n.toString(16);
        }
        break;
        
    case 'scientific':
        {
            let x = $Math.floor($Math.log10($Math.abs(n)));
            if ($Math.abs(x) === Infinity) { x = 0; }
            // round to 3 decimal places in scientific notation
            s = '' + ($Math.round(n * $Math.pow(10, 3 - x)) * 1e-3);
            // If rounding failed due to precision, truncate the
            // string itself
            s = s.substring(0, $Math.min((n < 0) ? 6 : 5), s.length);
            s += '×10';
            const e = '' + x;
            for (let i = 0; i < e.length; ++i) {
                s += $superscriptTable[e.charAt(i)];
            }
            break;
        }

    case 'clock12':
        {
            n = $Math.round(n / 60);
            const m = n % 60;
            let h = $Math.floor(n / 60);
            const suffix = ((h % 24) < 12) ? 'am' : 'pm';
            h = h % 12;
            if (h === 0) { h = 12; }
            h + ':' + $padZero(m) + suffix;
            break;
        }
        
    case 'clock24':
        {
            const m = $Math.floor(n / 60) % 60;
            const h = $Math.floor(n / 3600) % 24;
            s = h + ':' + $padZero(m);
            break;
        }
    case 'stopwatch':
        {
            const m = $Math.floor($Math.abs(n) / 60) * $Math.sign(n);
            const S = $padZero(n % 60);
            const f = $padZero((n - $Math.floor(n)) * 100);
            s = m + ':' + S + '.' + f;
            break;
        }
        
    case 'oldstopwatch':
        {
            const m = $Math.floor($Math.abs(n) / 60) * $Math.sign(n);
            const S = $padZero(n % 60);
            const f = $padZero((n - $Math.floor(n)) * 100);
            s = m + '"' + S + "'" + f;
            break;
        }

    case 'ordinalabbrev':
        n = $Math.round(n);
        switch (n) {
        case 1: s = '1ˢᵗ';
        case 2: s = '2ⁿᵈ';
        case 3: s = '3ʳᵈ';
        default: s = '' + n + 'ᵗʰ';
        }
        break;

    case 'ordinal':
        n = $Math.round(n);
        if (n >= 0 && n < $ordinal.length) {
            s = $ordinal[n];
        } else {
            s = '' + n + 'ᵗʰ';
        }
        break;

    case '':
    case undefined:
        if ($Math.abs(n) === Infinity) {
            s = n.toLocaleString('en');
        } else {
            s = '' + n;
        }
        break;
        
    default:
        {
            if ($Math.abs(n) === Infinity) {
                s = n.toLocaleString('en');
            } else {
                const match = fmt.match(/^( *)(0*)(\.0+)?(°|deg|degree|degrees|%)?$/);
                if (match) {
                    let spaceNum = match[1].length;
                    const intNum = match[2].length;
                    const fracNum = match[3] ? $Math.max(match[3].length - 1, 0) : 0;
                    let suffix = match[4];
                    
                    if (suffix === 'deg' || suffix === 'degrees' || suffix === 'degree' || suffix === '') {
                        suffix = '°';
                        n *= 180 / $Math.PI;
                    } else if (suffix === '%') {
                        n *= 100;
                    }
                    
                    s = $Math.abs(n).toFixed(fracNum);
                    
                    let i = (fracNum === 0) ? s.length : s.indexOf('.');
                    while (i < intNum) { s = '0' + s; ++i; }
                    
                    // Inject sign
                    if (n < 0) { s = '-' + s; --spaceNum; }
                    
                    while (i < intNum + spaceNum) { s = ' ' + s; ++i; }
                    
                    if (suffix) { s += suffix; }
                
                } else {
                    s = '' + n;
                }
            }
        }
    } // switch

    if (addPlus) {
        if (s[0] === ' ') {
            // Leading spaces case
            s = s.replace(/ (?=[^ ])/, '+');
        } else {
            s = '+' + s;
        }
    }

    return s;
}