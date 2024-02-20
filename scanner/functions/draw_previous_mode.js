function draw_previous_mode() {
    if ($skipGraphics) { return; }
    Array.prototype.push.apply($graphicsCommandList, $previousModeGraphicsCommandList);
}