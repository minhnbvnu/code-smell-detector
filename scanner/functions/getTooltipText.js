function getTooltipText(element) {
  const [tooltip] = atom.tooltips.findTooltips(element);
  return tooltip.getTitle();
}