function $RGB_to_SRGB(color) {
    const result = {
        r: $RGB_to$SRGB_one_channel(color.r),
        g: $RGB_to$SRGB_one_channel(color.g),
        b: $RGB_to$SRGB_one_channel(color.b)
    };
                    
    if (color.a !== undefined) {
        result.a = color.a;
    }

    return result;    
}