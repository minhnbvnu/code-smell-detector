function random_on_circle() {
    const t = random() * 2 * $Math.PI;
    return {x: $Math.cos(t), y: $Math.sin(t)};
}