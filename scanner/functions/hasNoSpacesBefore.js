function hasNoSpacesBefore(ctx) {
  return noSpaces(startOf(ctx), prevToken(ctx))
}