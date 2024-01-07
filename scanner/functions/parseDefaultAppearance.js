function parseDefaultAppearance(str) {
  return new DefaultAppearanceEvaluator(str).parse();
}