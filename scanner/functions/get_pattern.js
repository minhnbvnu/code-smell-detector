function get_pattern(layer, pattern, color, alpha, scale, weight) {
        layer.resize(scale, scale);
        layer.prepare();
        create_hatch_canvas(layer.ctx, pattern, color, alpha, scale, weight);
        return layer.canvas;
    }