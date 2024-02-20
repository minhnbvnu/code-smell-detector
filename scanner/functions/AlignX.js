function AlignX(align) {
        return {
            left: function (_w, _W) { return 0; },
            center: function (w, W) { return (W - w) / 2; },
            right: function (w, W) { return W - w; }
        }[align] || (function (_w, _W) { return 0; });
    }