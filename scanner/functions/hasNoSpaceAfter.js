function hasNoSpaceAfter(ctx) {
  return noSpaces(nextToken(ctx), stopOf(ctx))
}