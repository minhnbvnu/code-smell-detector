function gray(r) {
    if (r.h !== undefined) {
        // HSV -> RGB
        r = rgb(r);
    }
    
    if (r.r !== undefined) {
        // RGB -> grayscale. We're in sRGB space, where the actual grayscale conversion has to
        // be nonlinear, so this is a very coarse approximation.
        r = r.r * 0.35 + r.g * 0.50 + r.b * 0.15;
    }
    
    return rgb(r, r, r);
}