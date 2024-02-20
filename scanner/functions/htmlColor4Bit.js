function htmlColor4Bit(value) {
    if (value.h !== undefined) {
        // Convert to RGB
        value = QRuntime.rgba(value);
    }

    
    if (value.a !== undefined) {
        // RGBA
        return `rgba(${htmlColorChannel4Bit(value.r)}, ${htmlColorChannel4Bit(value.g)}, ${htmlColorChannel4Bit(value.b)}, ${htmlColorChannel4Bit(value.a) / 255})`;
    } else {
        // RGB
        return `rgb(${htmlColorChannel4Bit(value.r)}, ${htmlColorChannel4Bit(value.g)}, ${htmlColorChannel4Bit(value.b)})`;
    }
}