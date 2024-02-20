function withTheme(Component) {
  class ThemedComponent extends React.Component {
    render() {
      return (
        <ThemeContext.Consumer>
          {_theme => <Component {...this.props} theme={_theme} />}
        </ThemeContext.Consumer>
      );
    }
  }

  ThemedComponent.propTypes = Component.propTypes;
  ThemedComponent.defaultProps = Component.defaultProps;

  return ThemedComponent;
}