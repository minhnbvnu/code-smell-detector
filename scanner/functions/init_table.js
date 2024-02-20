function init_table() {
        var CODEPOINTS = 65536;
        var BITWIDTH = 2;
        var ITEMSIZE = 32;
        var CONTAINERSIZE = CODEPOINTS * BITWIDTH / ITEMSIZE;
        var CODEPOINTS_PER_ITEM = ITEMSIZE / BITWIDTH;
        table = (typeof Uint32Array === 'undefined')
            ? new Array(CONTAINERSIZE)
            : new Uint32Array(CONTAINERSIZE);
        for (var i = 0; i < CONTAINERSIZE; ++i) {
            var num = 0;
            var pos = CODEPOINTS_PER_ITEM;
            while (pos--) {
                num = (num << 2) | wcwidthBMP(CODEPOINTS_PER_ITEM * i + pos);
            }
            table[i] = num;
        }
        return table;
    }