function getTextColor(props) {
  if (props.type !== BUTTON_TYPE.MUTED) {
    return props.theme.textColorInvert;
  }
  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  }
  if (props.isHovered) {
    return props.theme.controlColorHovered;
  }
  return props.theme.controlColorPrimary;
}