function getNativeModes() {
    if (typeof document === 'undefined') {
        return {};
    }
    var i, mode, darken, ok;
    var nativeModes = {};
    var dCanvas = document.createElement('canvas');
    var ctx = dCanvas.getContext('2d');

    if (!ctx) { return {}; }

    var native = ['source-over', 'source-in', 'source-out', 'source-atop',
            'destination-over', 'destination-in', 'destination-out',
            'destination-atop', 'lighter', 'darker', 'copy', 'xor'];

    var maybeNative = ['multiply', 'screen', 'overlay', 'soft-light', 'hard-light',
            'color-dodge', 'color-burn', 'darken', 'lighten', 'difference',
            'exclusion', 'hue', 'saturation', 'luminosity', 'color',
            'add', 'subtract', 'average', 'negation'];

    var nonNative = ['divide', 'darker-color', 'lighter-color', 'linear-burn', 'linear-light',
            'vivid-light', 'pin-light', 'hard-mix'];

    for (i = 0; i < native.length; i += 1) {
        nativeModes[native[i]] = true;
    }
    for (i = 0; i < nonNative.length; i += 1) {
        nativeModes[nonNative[i]] = false;
    }
    dCanvas.width = 1;
    dCanvas.height = 1;
    for (i = 0; i < maybeNative.length; i += 1) {
        mode = maybeNative[i];
        darken = mode === 'darken';
        ok = false;
        ctx.save();
        try {
            ctx.fillStyle = darken ? '#300' : '#a00';
            ctx.fillRect(0, 0, 1, 1);
            ctx.globalCompositeOperation = mode;
            if (ctx.globalCompositeOperation === mode) {
                ctx.fillStyle = darken ? '#a00' : '#300';
                ctx.fillRect(0, 0, 1, 1);
                ok = ctx.getImageData(0, 0, 1, 1).data[0] !== (darken ? 170 : 51);
            }
        } catch (e) {
        }
        ctx.restore();
        nativeModes[mode] = ok;
    }

    addAliases(nativeModes);

    return nativeModes;
}