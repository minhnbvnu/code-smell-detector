function versionCheck(min, real) {
        var minComps = min.split(".");
        var realComps = real.split(".");
        while (realComps.length < minComps.length) realComps.push("0");

        for (var i = 0; i < minComps.length; i++) {
            var min = parseInt(minComps[i]);
            var real = parseInt(realComps[i]);
            if (real < min) return false;
            else if (real > min) return true;
        }

        return true;
    }