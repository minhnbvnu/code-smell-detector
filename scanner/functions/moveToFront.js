function moveToFront(el) {
    const { parentNode } = el;
    parentNode.removeChild(el);
    parentNode.appendChild(el);
  }