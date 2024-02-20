function addToDom(node, canvas) {
  let container = canvas.parentNode;

  node.setAttribute('data-kontra', '');
  if (container) {
    let target =
      container.querySelector('[data-kontra]:last-of-type') || canvas;
    container.insertBefore(node, target.nextSibling);
  } else {
    document.body.appendChild(node);
  }
}