function gamepadAxis(name, gamepad) {
  return gamepads[gamepad]?.axes[name] || 0;
}