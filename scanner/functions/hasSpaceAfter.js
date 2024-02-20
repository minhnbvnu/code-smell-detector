function hasSpaceAfter(ctx) {
  return hasSpace(nextToken(ctx), stopOf(ctx))
}