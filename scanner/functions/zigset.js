function zigset() {
        // seed generator based on current time
        // jsr ^= new Date().getTime();

        var m1 = 2147483648.0;
        var dn = 3.442619855899;
        var tn = dn;
        var vn = 9.91256303526217e-3;

        var q = vn / Math.exp(-0.5 * dn * dn);
        kn[0] = Math.floor((dn/q)*m1);
        kn[1] = 0;

        wn[0] = q / m1;
        wn[127] = dn / m1;

        fn[0] = 1.0;
        fn[127] = Math.exp(-0.5 * dn * dn);

        for(var i = 126; i >= 1; i--) {
            dn = Math.sqrt(-2.0 * Math.log( vn / dn + Math.exp( -0.5 * dn * dn)));
            kn[i+1] = Math.floor((dn/tn)*m1);
            tn = dn;
            fn[i] = Math.exp(-0.5 * dn * dn);
            wn[i] = dn / m1;
        }
    }