function colorToString(value) {
    function toHex(v) {
        // eslint-disable-next-line
        return (Math.round(v * 255) | (1 << 8)).toString(16).slice(1);
    }
    const red = toHex(value.red());
    const green = toHex(value.green());
    const blue = toHex(value.blue());
    const alpha = toHex(value.alpha());
    return `#${red}${green}${blue}${alpha}`;
}