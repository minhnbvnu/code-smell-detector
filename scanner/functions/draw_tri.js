function draw_tri(A, B, C, color, outline, pos, angle, scale, z) {
    // Skip graphics this frame
    if ($skipGraphics) { return; }
    if (A.A) {
        // Object version
        z = A.z;
        angle = A.angle;
        scale = A.scale;
        pos = A.pos;
        outline = A.outline;
        color = A.color;
        C = A.C;
        B = A.B;
        A = A.A;
    }
    draw_poly([A, B, C], color, outline, pos, angle, scale, z);
}