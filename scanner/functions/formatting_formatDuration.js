function formatting_formatDuration(ms) {
  return pretty_ms_default()(ms, {
    millisecondsDecimalDigits: 1
  });
}