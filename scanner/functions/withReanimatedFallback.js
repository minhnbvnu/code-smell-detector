function withReanimatedFallback(
  ChartComponent,
  showText = false
) {
  return !TurboModuleRegistry.get('NativeReanimated') &&
    (!global.__reanimatedModuleProxy ||
      global.__reanimatedModuleProxy.__shimmed)
    ? showText
      ? ChartFallback
      : () => null
    : ChartComponent;
}