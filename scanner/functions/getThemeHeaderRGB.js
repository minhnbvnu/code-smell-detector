function getThemeHeaderRGB(rgb){

    let validation = (val) => {
        return val - 40 < 0 ? 0 : val - 40;
    };
    let validation2 = (val) => {
        return val + 20 > 255 ? 255 : val + 20;
    };

    let r = validation2(rgb.r);
    let g = validation(rgb.g);
    let b = (rgb.b);

    return { "r": r, "g": g, "b": b};
}