function load_font(font, obj) {
        const objs = _font_cache.get(font);
        if (objs == null) {
            const objs = new WeakSet([obj]);
            _font_cache.set(font, objs);
        }
        else if (!objs.has(obj)) {
            objs.add(obj);
        }
        else {
            return;
        }
        const { fonts } = document;
        if (!fonts.check(font)) {
            fonts.load(font).then(() => obj.request_render());
        }
    }