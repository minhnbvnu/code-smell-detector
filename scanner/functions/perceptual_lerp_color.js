function perceptual_lerp_color(a, b, t) {
    let was_rgb = false;
    if (a.h === undefined && a.r !== undefined) {
        if (b.h !== undefined || b.r === undefined) { $error("perceptual_lerp_color() requires both colors to be rgb() or hsv()"); }
        // rgb case
        was_rgb = true;
        
    } else if (a.r === undefined && a.h !== undefined) {
        // hsv case
        if (b.r !== undefined || b.h === undefined) { $error("perceptual_lerp_color() requires both colors to be rgb() or hsv()"); }
        if (a.a !== undefined) {
            a = rgba(a);
            b = rgba(b);
        } else {
            a = rgb(a);
            b = rgb(b);
        }
    } else {
        $error("perceptual_lerp_color() requires both colors to be rgb() or hsv()");
    }

    a = $XYZ_to_LAsBs($RGB_to_XYZ($SRGB_to_RGB(a)));
    b = $XYZ_to_LAsBs($RGB_to_XYZ($SRGB_to_RGB(b)));
    let c = lerp(a, b, t);
    c = $RGB_to_SRGB($XYZ_to_RGB($LAsBs_to_XYZ(c)));

    c.r = $clamp(c.r, 0, 1);
    c.g = $clamp(c.g, 0, 1);
    c.b = $clamp(c.b, 0, 1);
    
    if (! was_rgb) {
        // Go back to HSV
        if (c.a !== undefined) {
            c = hsva(c);
        } else {
            c = hsv(c);
        }
    }
    
    return c;
}