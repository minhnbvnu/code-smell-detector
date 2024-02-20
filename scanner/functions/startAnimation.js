function startAnimation(animation, options, callback) {
  Animated
    .timing(animation, options)
    .start(callback);
}