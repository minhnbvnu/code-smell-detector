function activateElements() {
    // activate all elements in the queue
    for (var key in queueElements) {
      if (queueElements[key]) {
        queueElements[key].classList.add(ACTIVATED_CLASS);
        activeElements[key] = queueElements[key];
      }
    }
    queueElements = {};
  }