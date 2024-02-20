function getDarkenedRGB(rgb){

    let validation = (val) => {
        return val + 20 > 255 ? 255 : val + 20;
    };

    let r = validation(rgb.r);
    let b = validation(rgb.b);
    let g = validation(rgb.g);

    return { "r": r, "g": g, "b": b};
}