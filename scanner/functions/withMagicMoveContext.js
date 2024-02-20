function withMagicMoveContext(WrappedComponent) {
  const comp = props => {
    return (
      <Context.Consumer>
        {mmContext => <WrappedComponent {...props} mmContext={mmContext} />}
      </Context.Consumer>
    );
  };
  comp.propTypes = {
    ...(WrappedComponent.propTypes || {})
  };
  delete comp.propTypes.mmContext;
  comp.defaultProps = WrappedComponent.defaultProps;
  return comp;
}