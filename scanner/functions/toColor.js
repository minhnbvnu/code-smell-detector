function toColor(color) {
    if (color) {
        if (color.type == 'Color') {
            return color;
        } else {
            return _color.set(color);
        }
    } else {
        return _color.set(Math.random() * 0xffffff);
    }
}