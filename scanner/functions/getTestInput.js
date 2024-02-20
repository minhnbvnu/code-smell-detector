function getTestInput() {
      return class extends React.Component {
        state = {
          value: this.props.value == null ? '' : this.props.value,
        };
        onChange = event => {
          this.setState({value: event.target.value});
        };
        render() {
          const type = this.props.type;
          const value = this.state.value;

          return <input type={type} value={value} onChange={this.onChange} />;
        }
      };
    }