function clearCanvas() {
  let c = canvas()
  canvasContext().clearRect(0, 0, c.width, c.height)
}