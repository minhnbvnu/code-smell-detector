function updateColor() {
    var alpha = new Number(alphaSlider.knobPercent.toFixed(2))
    var color =
        'rgba(' +
        parseInt(redSlider.knobPercent * 255) +
        ',' +
        parseInt(greenSlider.knobPercent * 255) +
        ',' +
        parseInt(blueSlider.knobPercent * 255) +
        ',' +
        alpha +
        ')'

    colorPatchContext.fillStyle = color

    colorPatchContext.clearRect(0, 0, colorPatchContext.canvas.width, colorPatchContext.canvas.height)

    colorPatchContext.fillRect(0, 0, colorPatchContext.canvas.width, colorPatchContext.canvas.height)

    colorPatchContext.font = '18px Arial'
    colorPatchContext.fillStyle = 'white'
    colorPatchContext.fillText(color, 10, 40)

    alpha = alpha + 0.2 > 1.0 ? 1.0 : alpha + 0.2
    alphaSlider.opacity = alpha
}