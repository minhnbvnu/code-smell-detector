function getContainerDOM() {
  if (!dom) {
    dom = document.createElement('div');
    document.body.appendChild(dom);
  }

  return dom;
}