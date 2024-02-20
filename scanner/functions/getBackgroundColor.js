function getBackgroundColor(props) {
  if (props.type === BUTTON_TYPE.MUTED) {
    return props.theme.background;
  }
  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  }

  switch (props.type) {
    case BUTTON_TYPE.PRIMARY:
      return props.isHovered ? props.theme.primary500 : props.theme.controlColorActive;
    case BUTTON_TYPE.WARNING:
      return props.isHovered ? props.theme.warning500 : props.theme.warning400;
    case BUTTON_TYPE.NORMAL:
    default:
      return props.isHovered ? props.theme.controlColorHovered : props.theme.controlColorPrimary;
  }
}