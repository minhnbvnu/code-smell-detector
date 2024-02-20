function processNext() {
    while (beingAnimated.size < maxAnimations && scheduled.length > 0) {
      let link = scheduled.pop()
      let speed = Math.round(Math.abs(random.gaussian() * 30)) + 1
      beingAnimated.set(link.id, animateLink(link, speed));
    }

    beingAnimated.forEach(function(el, key) {
      el.step();
      if (el.isDone) beingAnimated.delete(key);
    });
    if (scheduled.length > 0 || beingAnimated.size > 0) {
      processor = requestAnimationFrame(processNext);
    }
  }