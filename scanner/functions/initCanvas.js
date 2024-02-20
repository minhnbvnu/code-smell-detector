function initCanvas() {
    panelContext.fillStyle = 'white';
    for (let i = 10; i < 510; i += 10) {
        for (let j = 10; j < 510; j += 10) {
            panelContext.fillRect(
                i,
                j,
                9,
                9,
            );
        }
    }
}