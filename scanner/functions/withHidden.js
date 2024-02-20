function withHidden(WrappedComponent, text) {
  return class HiddenForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hidden: true };
      this.show = this.show.bind(this);
    }

    show() {
      this.setState({ hidden: false });
    }

    render() {
      return (
        <div>
          {this.state.hidden ? (
            <button className={styles.link} onClick={this.show}>
              {text}
            </button>
          ) : (
            <WrappedComponent {...this.props} />
          )}
        </div>
      );
    }
  };
}