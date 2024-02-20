function unobserve(root, observer) {
    if (Object.observe) {
      Object.unobserve(root, observer);
      markPaths(observer, root);
    } else {
      clearTimeout(observer.next);
    }
  }