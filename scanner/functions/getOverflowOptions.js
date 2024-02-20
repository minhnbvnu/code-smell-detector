function getOverflowOptions(autoAdjustOverflow) {
  if (typeof autoAdjustOverflow === 'boolean') {
    return autoAdjustOverflow ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled;
  }
  return placements_extends(placements_extends({}, autoAdjustOverflowDisabled), autoAdjustOverflow);
}