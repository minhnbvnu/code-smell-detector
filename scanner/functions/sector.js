function sector(cx, cy, r, paper, startAngle, endAngle, params) {
    var x1 = cx + r * Math.cos(-startAngle * rad),
      x2 = cx + r * Math.cos(-endAngle * rad),
      y1 = cy + r * Math.sin(-startAngle * rad),
      y2 = cy + r * Math.sin(-endAngle * rad);
    return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
  }