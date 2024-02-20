async function injectCSS(page, css) {
  await page.evaluate(function(css) {
    var ns = "http://www.w3.org/2000/svg";
    var style = document.createElementNS(ns, "style");
    style.setAttribute('type', 'text/css');
    style.appendChild(document.createCDATASection(css));
    var svg = document.documentElement;
    svg.insertBefore(style, svg.firstChild);
  }, css);
}