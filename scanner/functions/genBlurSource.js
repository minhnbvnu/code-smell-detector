function genBlurSource(direction, taps) {
    return {
        sections: [`gauss${taps}(`, ")"],
        values: [direction],
    };
}