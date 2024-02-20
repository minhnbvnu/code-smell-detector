function array2DPrint(a, x, y, w, h, showValue, mask = 0xff) {
    function twoCharHex(v) {
        return (v < 16 ? '0' : '') + v.toString(16);
    }
    
    if (x !== undefined) {
        const tmp = array2DUint8(w, h);
        array2DSetRect(tmp, 0, 0, a, x, y, w, h);
        a = tmp;
    }
    
    const bar = new Array(a.width + 1).join('━━');
    let s = '  ┏' + bar + '┓\n';
    for (let y = 0; y < a.height; ++y) {
        if (y < 10) { s += ' ' + y; } else { s += y; }
        s += '┃';
        for (let x = 0; x < a.width; ++x) {
            const m = a.data[x + y * a.width];
            s += (m & mask) && (showValue ? twoCharHex(m) : '█▋') || '· ';
        }
        s += '┃\n';
    }
    s += '  ┗' + bar + '┛';
    console.log(s);
}