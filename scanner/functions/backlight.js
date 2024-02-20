function backlight($player, $video) {
    const $backlight = document.createElement('div');
    $backlight.classList.add('backlight');
    setStyles($backlight, {
        position: 'absolute',
        zIndex: 9,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    });

    const matrix = creatMatrix($backlight);
    const $canvas = document.createElement('canvas');
    $player.insertBefore($backlight, $video);

    function run() {
        const { clientWidth, clientHeight } = $video;
        const colors = getColors($canvas, $video, clientWidth, clientHeight);
        colors.forEach(({ r, g, b }, index) => {
            const { $box, left, right, top, bottom } = matrix[index];
            const x = left ? '-64px' : right ? '64px' : '0';
            const y = top ? '-64px' : bottom ? '64px' : '0';
            $box.style.boxShadow = `rgb(${r}, ${g}, ${b}) ${x} ${y} 128px`;
        });
    }

    $video.addEventListener('seeked', run);
    $video.addEventListener('loadedmetadata', () => setTimeout(run, 1000));

    (function loop() {
        window.requestAnimationFrame(() => {
            if (isPlaying($video)) {
                run();
            }
            loop();
        });
    })();
}