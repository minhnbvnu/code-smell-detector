function brFixer(node, tag = "p") {
  if (node.hasAttribute(fixedSign)) {
    return;
  }
  node.setAttribute(fixedSign, "true");

  const gapTags = ["BR", "WBR"];
  const newlineTags = [
    "DIV",
    "UL",
    "OL",
    "LI",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "P",
    "HR",
    "PRE",
    "TABLE",
    "BLOCKQUOTE",
  ];

  let html = "";
  node.childNodes.forEach(function (child, index) {
    if (index === 0) {
      html += `<${tag} class="kiss-p">`;
    }

    if (gapTags.indexOf(child.nodeName) !== -1) {
      html += `</${tag}><${tag} class="kiss-p">`;
    } else if (newlineTags.indexOf(child.nodeName) !== -1) {
      html += `</${tag}>${child.outerHTML}<${tag} class="kiss-p">`;
    } else if (child.outerHTML) {
      html += child.outerHTML;
    } else if (child.textContent) {
      html += child.textContent;
    }

    if (index === node.childNodes.length - 1) {
      html += `</${tag}>`;
    }
  });
  node.innerHTML = html;
}