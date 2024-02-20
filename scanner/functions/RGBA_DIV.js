function RGBA_DIV(c, s, r) {
    s = 1 / s;
    r.r = c.r * s;
    r.g = c.g * s;
    r.b = c.b * s;
    r.a = c.a * s;
}