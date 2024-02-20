function font_metrics(font) {
        let metrics = _metrics_cache.get(font);
        if (metrics == null) {
            const loaded = document.fonts.check(font);
            metrics = { font: _font_metrics(font) };
            if (loaded) {
                _metrics_cache.set(font, metrics);
            }
        }
        return metrics.font;
    }