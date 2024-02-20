function hidpi(canvas, height, width) {
    canvas.width = height * window.devicePixelRatio;
    canvas.height = width * window.devicePixelRatio;
    canvas.style.width = height + 'px';
    canvas.style.height = width + 'px';
    canvas.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio);
}