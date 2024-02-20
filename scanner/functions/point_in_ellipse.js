function point_in_ellipse(x, y, angle, b, a, x0, y0) {
        const A = ((Math.cos(angle) / a) ** 2 + (Math.sin(angle) / b) ** 2);
        const B = 2 * Math.cos(angle) * Math.sin(angle) * ((1 / a) ** 2 - (1 / b) ** 2);
        const C = ((Math.cos(angle) / b) ** 2 + (Math.sin(angle) / a) ** 2);
        const eqn = A * (x - x0) ** 2 + B * (x - x0) * (y - y0) + C * (y - y0) ** 2;
        const inside = eqn <= 1;
        return inside;
    }