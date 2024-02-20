function boxToSVGRect({ l: left, r: right, b: bottom, t: top }) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", left.toString());
  rect.setAttribute("y", top.toString());
  rect.setAttribute("width", (right - left).toString());
  rect.setAttribute("height", (bottom - top).toString());

  // Some style; corner radius 4px. Can't set this in CSS yet
  rect.setAttribute("rx", "4");
  rect.setAttribute("ry", "4");
  return rect;
}