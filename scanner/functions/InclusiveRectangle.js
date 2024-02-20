function InclusiveRectangle(x, y, width, height) {
    Rectangle.call(this, x, y, width - 1, height - 1);
}