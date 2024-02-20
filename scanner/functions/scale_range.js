function scale_range(x_scales, y_scales, x_range, y_range, factor, x_axis = true, y_axis = true, center) {
        /*
         * Utility function for zoom tools to calculate/create the zoom_info object
         * of the form required by `PlotView.update_range`.
         */
        const x_factor = x_axis ? factor : 0;
        const [sx0, sx1] = scale_highlow(x_range, x_factor, center === null || center === void 0 ? void 0 : center.x);
        const xrs = get_info(x_scales, [sx0, sx1]);
        const y_factor = y_axis ? factor : 0;
        const [sy0, sy1] = scale_highlow(y_range, y_factor, center === null || center === void 0 ? void 0 : center.y);
        const yrs = get_info(y_scales, [sy0, sy1]);
        // OK this sucks we can't set factor independently in each direction. It is used
        // for GMap plots, and GMap plots always preserve aspect, so effective the value
        // of 'dimensions' is ignored.
        return { xrs, yrs, factor };
    }