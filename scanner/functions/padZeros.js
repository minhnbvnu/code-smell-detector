function padZeros(value, tok, options) {
        if (!tok.isPadded) {
            return value;
        }
        let diff = Math.abs(tok.maxLen - String(value).length);
        let relax = options.relaxZeros !== false;
        switch (diff) {
            case 0:
                return '';
            case 1:
                return relax ? '0?' : '0';
            case 2:
                return relax ? '0{0,2}' : '00';
            default: {
                return relax ? `0{0,${diff}}` : `0{${diff}}`;
            }
        }
    }