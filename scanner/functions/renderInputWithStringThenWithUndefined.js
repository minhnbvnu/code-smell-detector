function renderInputWithStringThenWithUndefined() {
      let setValueToUndefined;
      class Input extends React.Component {
        constructor() {
          super();
          setValueToUndefined = () => this.setState({value: undefined});
        }
        state = {value: 'first'};
        render() {
          return (
            <input
              onChange={e => this.setState({value: e.target.value})}
              value={this.state.value}
            />
          );
        }
      }

      const stub = ReactDOM.render(<Input />, container);
      input = ReactDOM.findDOMNode(stub);
      setUntrackedValue.call(input, 'latest');
      dispatchEventOnNode(input, 'input');
      setValueToUndefined();
    }