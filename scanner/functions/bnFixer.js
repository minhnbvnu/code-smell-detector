function bnFixer(node, tag = "p") {
  if (node.hasAttribute(fixedSign)) {
    return;
  }
  node.setAttribute(fixedSign, "true");
  node.innerHTML = node.innerHTML
    .split("\n")
    .map((item) => `<${tag} class="kiss-p">${item || "&nbsp;"}</${tag}>`)
    .join("");
}