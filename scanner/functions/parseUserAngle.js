function parseUserAngle(text) {
    let c = Complex.parse(text);
    if (c.imag !== 0 || isNaN(c.imag)) {
        throw new Error("You just had to make it complicated, didn't you?");
    }
    return c.real * Math.PI / 180;
}