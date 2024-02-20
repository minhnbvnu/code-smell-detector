function useRouteContext () {
  const { 
    routeContext: ctx, 
    state,
    actions
  } = getContext(routeContext)
  ctx.state = state
  ctx.actions = actions
  ctx.snapshot = useSnapshot(state)
  return ctx
}