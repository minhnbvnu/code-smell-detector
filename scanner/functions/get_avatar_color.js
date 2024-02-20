function get_avatar_color(snum) {
    const hue = snum * 137.508 % 360; // Use the golden angle for more distinct colors
    const saturation = 40 + (snum % 20); // Saturation range: 40-60
    const lightness = 55 + (snum % 10); // Lightness range: 70-80

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}