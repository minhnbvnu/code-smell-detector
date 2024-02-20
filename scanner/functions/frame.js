function frame() {
    if (wind.windData) {
        wind.draw();
    }
    requestAnimationFrame(frame);
}