function getMap(pad) {
    const custom = custom_maps[pad.id];
    if (custom) {
        return custom;
    }

    for (const code in PRODUCT_CODES) {
        if (pad.id.indexOf(code) !== -1) {
            const product = PRODUCT_CODES[code];

            if (!pad.mapping) {
                const raw = MAPS['RAW_' + product];

                if (raw) {
                    return raw;
                }
            }

            return MAPS[product];
        }
    }

    if (pad.mapping === 'xr-standard') {
        return MAPS.DEFAULT_XR;
    }

    const defaultmap = MAPS.DEFAULT;
    const map = pad.buttons.length < defaultmap.buttons.length ? MAPS.DEFAULT_DUAL : defaultmap;
    map.mapping = pad.mapping;
    return map;
}