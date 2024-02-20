function clearFill(x, y, width, height, color) {
    var a = alpha(color);
    if (a < 1) {
        // If background is translucent, we must clear the rect before the fillRect
        // below to prevent mixing with previous frame's render of this cell.
        this.clearRect(x, y, width, height);
    }
    if (a > 0) {
        this.cache.fillStyle = color;
        this.fillRect(x, y, width, height);
    }
}