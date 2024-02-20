function secure (scope) {

  return DecoratedComponent =>
  class SecureDecorator extends React.Component {

    static contextTypes = {
      store: PropTypes.any
    };

    render () {
      const { store } = this.context
      const { application: { user } } = store.getState()

      if (user.permissions.some(s => s === scope))
        return <DecoratedComponent {...this.props} />
      else
        return <Forbidden />
    }
  }
}