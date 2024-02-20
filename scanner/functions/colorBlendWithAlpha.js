function colorBlendWithAlpha(c1, c2, k) {
        var f = 0|(k * ((c2 & PConstants.ALPHA_MASK) >>> 24));
        return (Math.min(((c1 & PConstants.ALPHA_MASK) >>> 24) + f, 0xff) << 24 |
                p.mix(c1 & PConstants.RED_MASK, c2 & PConstants.RED_MASK, f) & PConstants.RED_MASK |
                p.mix(c1 & PConstants.GREEN_MASK, c2 & PConstants.GREEN_MASK, f) & PConstants.GREEN_MASK |
                p.mix(c1 & PConstants.BLUE_MASK, c2 & PConstants.BLUE_MASK, f));
    }