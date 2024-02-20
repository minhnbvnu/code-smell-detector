function materialEase(t, b, c, d) {
  // via http://www.timotheegroleau.com/Flash/experiments/easing_function_generator.htm
  // with settings of [0, 0, 1, 1]
  let ts = (t /= d) * t;
  let tc = ts * t;
  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
}