function $SRGB_to_RGB(color) {
    const result = {
        r: $SRGB_to_RGB_one_channel(color.r),
        g: $SRGB_to_RGB_one_channel(color.g),
        b: $SRGB_to_RGB_one_channel(color.b)
    };
                    
    if (color.a !== undefined) {
        result.a = color.a;
    }

    return result;    
}