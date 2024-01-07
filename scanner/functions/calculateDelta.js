function calculateDelta(tickValue, ticks) {
  // Figure out how many digits to show
  // The space between the first two ticks might be smaller than normal spacing
  let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;

  // If we have a number like 2.5 as the delta, figure out how many decimal places we need
  if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
    // not an integer
    delta = tickValue - Math.floor(tickValue);
  }
  return delta;
}