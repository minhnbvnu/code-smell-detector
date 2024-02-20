function addLoading(node, loadingId) {
  const div = document.createElement("div");
  div.id = loadingId;
  div.innerHTML = loadingSvg;
  div.style.cssText = `
      width: ${node.offsetWidth}px;
      height: ${node.offsetHeight}px;
      line-height: ${node.offsetHeight}px;
      position: absolute;
      text-align: center;
      left: ${node.offsetLeft}px;
      top: ${node.offsetTop}px;
      z-index: 2147483647;
    `;
  node.offsetParent?.appendChild(div);
}