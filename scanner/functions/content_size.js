function content_size(el) {
        var _a;
        const { left, top } = el.getBoundingClientRect();
        const { padding } = extents(el);
        let width = 0;
        let height = 0;
        for (const child of ((_a = el.shadowRoot) !== null && _a !== void 0 ? _a : el).children) {
            const rect = child.getBoundingClientRect();
            width = Math.max(width, Math.ceil(rect.left - left - padding.left + rect.width));
            height = Math.max(height, Math.ceil(rect.top - top - padding.top + rect.height));
        }
        return { width, height };
    }