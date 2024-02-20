function toHSL(color) {
        if (color.toHSL) {
            return color.toHSL();
        }
        else {
            throw new Error('Argument cannot be evaluated to a color');
        }
    }