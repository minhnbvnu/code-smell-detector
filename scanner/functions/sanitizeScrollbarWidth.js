function sanitizeScrollbarWidth(width) {
    width = Math.max(0, width); // no negatives
    width = Math.round(width);
    return width;
}