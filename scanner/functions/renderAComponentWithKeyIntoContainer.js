function renderAComponentWithKeyIntoContainer(key, container) {
    class Wrapper extends React.Component {
      render() {
        return (
          <div>
            <span ref="span" key={key} />
          </div>
        );
      }
    }

    const instance = ReactDOM.render(<Wrapper />, container);
    const span = instance.refs.span;
    expect(span).not.toBe(null);
  }