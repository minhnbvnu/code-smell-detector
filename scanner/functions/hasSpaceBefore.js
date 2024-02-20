function hasSpaceBefore(ctx) {
  return hasSpace(startOf(ctx), prevToken(ctx))
}