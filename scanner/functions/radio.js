function radio(name, selectedValue, onChange) {
    return _React['default'].createClass({
      render: function render() {
        var optional = {};
        if (selectedValue !== undefined) {
          optional.checked = this.props.value === selectedValue;
        }
        if (typeof onChange === 'function') {
          optional.onChange = onChange.bind(null, this.props.value);
        }

        return _React['default'].createElement('input', _extends({}, this.props, {
          type: 'radio',
          name: name
        }, optional));
      }
    });
  }