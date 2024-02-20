function nfix(hz, iz) {
        var r = 3.442619855899;
        var r1 = 1.0 / r;
        var x;
        var y;
        while(true) {
            x = hz * wn[iz];
            if( iz == 0 ) {
                x = (-Math.log(UNI()) * r1);
                y = -Math.log(UNI());
                while( y + y < x * x) {
                    x = (-Math.log(UNI()) * r1);
                    y = -Math.log(UNI());
                }
                return ( hz > 0 ) ? r+x : -r-x;
            }

            if( fn[iz] + UNI() * (fn[iz-1] - fn[iz]) < Math.exp(-0.5 * x * x) ) {
                 return x;
            }
            hz = SHR3();
            iz = hz & 127;

            if( Math.abs(hz) < kn[iz]) {
                return (hz * wn[iz]);
            }
        }
    }