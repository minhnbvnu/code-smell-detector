function creatMatrix(parent) {
    return matrixCallback((xIndex, yIndex, x, y) => {
        const $box = document.createElement('div');
        $box.style.position = 'absolute';
        $box.style.left = `${(xIndex * 100) / x}%`;
        $box.style.top = `${(yIndex * 100) / y}%`;
        $box.style.width = `${100 / x}%`;
        $box.style.height = `${100 / y}%`;
        $box.style.borderRadius = '50%';
        $box.style.transition = 'all .2s ease';
        parent.appendChild($box);
        return {
            $box,
            left: xIndex === 0,
            right: xIndex === x - 1,
            top: yIndex === 0,
            bottom: yIndex === y - 1,
        };
    });
}