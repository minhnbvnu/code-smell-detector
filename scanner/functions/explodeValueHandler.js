function explodeValueHandler(me, val, valprops, encoder, adder) {
        if (valprops.isArr) {
            var i = 0, cnt = val.length;
            for (i = 0; i<cnt; i++) {
                adder("", encoder(val[i]) );
            }
        } else if (valprops.isObj) {
            var k;
            for (k in val) {
                if (val.hasOwnProperty(k)) {
                    adder(k, encoder(val[k]) );
                }
            }
        } else { // explode-requested, but single value
            adder("", encoder(val));
        }
    }