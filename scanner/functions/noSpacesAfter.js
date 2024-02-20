function noSpacesAfter(ctx, thenRaise) {
  whenNot(hasNoSpaceAfter, ctx, thenRaise, 'Required no spaces after')
}