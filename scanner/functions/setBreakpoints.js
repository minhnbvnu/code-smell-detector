function setBreakpoints(container, width) {
  if (!container.isConnected) return;

  const breakpoints = container.getAttribute(Attributes.BREAKPOINTS) ?? defaultBreakpoints;
  const ranges = createBreakpointMap(breakpoints);
  const activeBreakpoints = getBreakpoints(ranges, width);

  let changed = false;

  Object.keys(ranges).forEach((name) => {
    if (activeBreakpoints.includes(name)) {
      if (!container.hasAttribute(`breakpoint${name}`)) {
        container.setAttribute(`breakpoint${name}`, '');
        changed = true;
      }
      return;
    }

    if (container.hasAttribute(`breakpoint${name}`)) {
      container.removeAttribute(`breakpoint${name}`);
      changed = true;
    }
  });

  if (changed) {
    const evt = new CustomEvent(MediaStateChangeEvents.BREAKPOINTS_CHANGE, {
      detail: activeBreakpoints
    });

    container.dispatchEvent(evt)
  }
}