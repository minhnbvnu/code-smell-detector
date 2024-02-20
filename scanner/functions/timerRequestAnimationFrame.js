function timerRequestAnimationFrame (cb, delay) {
    let startTime = Date.now()
    loop()
  
    function loop () {
      const now = Date.now()
      if (now - startTime >= delay) {
        cb();
        return;
      }
      timerRequestAnimationFrame(loop)
    }
}