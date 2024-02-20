function getPaddingAndSize(context, artboard) {
  let iconPadding = context.command.valueForKey_onLayer('padding', artboard);

  if (!iconPadding) {
    const icon = artboard.layers()[0].rect();
    iconPadding = Math.min(icon.origin.x, icon.origin.y);
  }

  return {
    iconPadding: parseInt(iconPadding),
    artboardSize: parseInt(artboard.rect().size.width)
  };
}