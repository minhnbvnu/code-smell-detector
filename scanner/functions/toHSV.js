function toHSV(color) {
        if (color.toHSV) {
            return color.toHSV();
        }
        else {
            throw new Error('Argument cannot be evaluated to a color');
        }
    }