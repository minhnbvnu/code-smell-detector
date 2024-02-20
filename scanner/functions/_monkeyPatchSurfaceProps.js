function _monkeyPatchSurfaceProps (parent, props) {
  let newProps = Object.assign({}, props)
  if (props.model && !props.node) {
    const model = props.model
    switch (model.type) {
      case 'collection': {
        newProps.containerPath = model._path
        break
      }
      default: {
        // TODO: do we really need this anymore?
        if (model._node) {
          newProps.node = model._node
        }
      }
    }
  }
  return newProps
}