function hkZLLSwitchAction (value, oldValue, repeat = false) {
  if (value < 1000) {
    return Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS
  }
  const button = Math.floor(value / 1000)
  const oldButton = Math.floor(oldValue / 1000)
  const event = value % 1000
  const oldEvent = oldValue % 1000
  switch (event) {
    case PRESS:
      // Wait for Hold or Release after press.
      return null
    case SHORT_RELEASE:
      return Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS
    case HOLD:
    case LONG_RELEASE:
      if (repeat) {
        return Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS
      }
      if (button === oldButton && oldEvent === HOLD) {
        // Already issued action on previous Hold.
        return null
      }
      // falls through
    case TRIPLE_PRESS:
    case QUADRUPLE_PRESS:
    case SHAKE:
      return Characteristic.ProgrammableSwitchEvent.LONG_PRESS
    case DOUBLE_PRESS:
    case DROP:
      return Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS
    default:
      return null
  }
}