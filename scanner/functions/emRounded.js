function emRounded(m, em) {
        if (em === void 0) {
            em = 16;
        }
        m = (Math.round(m * em) + .05) / em;
        if (Math.abs(m) < .001)
            return '0em';
        return m.toFixed(3).replace(/\.?0+$/, '') + 'em';
    }