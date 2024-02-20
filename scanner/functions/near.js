function near(a, b, margin, msg) {
  if (Math.abs(a - b) > margin)
    throw new Failure(label(a + " is not close to " + b + " (" + margin + ")", msg));
}