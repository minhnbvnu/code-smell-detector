function detectSupportMode() {
        return (typeof emojione['jsEscapeMap']).toLowerCase() === 'object' ? emojione.cacheBustParam === "?v=1.2.4" ? 2 : 1 : 0;
    }