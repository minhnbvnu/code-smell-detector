function RNOR() {
        var hz = SHR3();
        var iz = hz & 127;
        return (Math.abs(hz) < kn[iz]) ? hz * wn[iz] : nfix(hz, iz);
    }