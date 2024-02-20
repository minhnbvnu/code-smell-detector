function drizzleConnect(Component, ...args) {
  var ConnectedWrappedComponent = connect(...args)(Component)

  const DrizzledComponent = (props, context) => (
    <ConnectedWrappedComponent {...props} store={context.drizzleStore} />
  )

  DrizzledComponent.contextTypes = {
    drizzleStore: PropTypes.object
  }

  return DrizzledComponent
}