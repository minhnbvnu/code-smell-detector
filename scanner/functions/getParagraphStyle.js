function getParagraphStyle(p) {
  return {
    leading: Math.round(p.leading),
    spaceBefore: Math.round(p.spaceBefore),
    spaceAfter: Math.round(p.spaceAfter),
    justification: String(p.justification) // coerce from object
  };
}