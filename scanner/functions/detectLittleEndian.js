function detectLittleEndian(view) {
        var nFields = view.getInt32(8, false);
        if (nFields === 11) {
            return false;
        }
        nFields = view.getInt32(8, true);
        if (nFields !== 11) {
            console.warn('Failed to detect nadgrid endian-ness, defaulting to little-endian');
        }
        return true;
    }