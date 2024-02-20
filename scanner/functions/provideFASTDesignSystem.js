function provideFASTDesignSystem(element) {
  return DesignSystem.getOrCreate(element).withPrefix("fast");
}