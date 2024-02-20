function renderInputWithStringThenWithNull() {
      let setValueToNull;
      class Input extends React.Component {
        constructor() {
          super();
          setValueToNull = () => this.setState({value: null});
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
      setValueToNull();
    }