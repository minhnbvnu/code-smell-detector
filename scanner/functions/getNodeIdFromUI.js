function getNodeIdFromUI(el) {
    while (el) {
      if (el.classList.contains('node')) return el.id.slice('node-'.length);
      el = el.parentNode;
    }
  }