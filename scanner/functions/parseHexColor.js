function parseHexColor(str) {
    let r, g, b, a = 1;

    switch (str.length) {
    case 8: // RRGGBBAA
        a = parseHex(str.substring(6, 8));
        // Fall through
        
    case 6: // RRGGBB
        r = parseHex(str.substring(0, 2));
        g = parseHex(str.substring(2, 4));
        b = parseHex(str.substring(4, 6));
        break;
        
    case 4: // RGBA
        a = parseHex(str[3]);
        // Fall through
        
    case 3: // RGB
        r = parseHex(str[0]);
        g = parseHex(str[1]);
        b = parseHex(str[2]);
        break;
        
    case 2: // YY
        r = g = b = parseHex(str);
        break;
        
    case 1: // Y
        r = g = b = parseHex(str);
        break;
        
    default:
        throw new Error("Illegal hexadecimal color specification: '#" + str + "'");
    }
    
    return {r:r, g:g, b:b, a:a};
}