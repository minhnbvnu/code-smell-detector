function percentTo255Hex(v) {
        // Convert to integer
        v = clamp(Math.round(v * scale), 0, scale);
        // Zero pad and hex convert
        return (v < 16 && scale === 255 ? '0' : '') + v.toString(16);
    }