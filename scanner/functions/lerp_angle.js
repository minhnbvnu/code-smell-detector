function lerp_angle(a, b, t) {
    a = $loop(a, -$Math.PI, $Math.PI);
    b = $loop(b, -$Math.PI, $Math.PI);

    // Find the shortest direction
    if (b > a + $Math.PI) {
        b -= 2 * $Math.PI;
    } else if (b < a - $Math.PI) {
        b += 2 * $Math.PI;
    }

    return a + (b - a) * t;    
}