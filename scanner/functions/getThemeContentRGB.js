function getThemeContentRGB(rgb){

    let validation = (val) => {
        return val - 70 < 0 ? 0 : val - 70;
    };
    let validation2 = (val) => {
        return val - 20 < 0 ? 0 : val - 20;
    };
    let validation3 = (val) => {
        return val - 40 < 0 ? 0 : val - 40;
    };

    let r = validation2(rgb.r);
    let g = validation(rgb.g);
    let b = validation3(rgb.b);

    return { "r": r, "g": g, "b": b};
}