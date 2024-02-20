function valueType(props, propName, componentName) {
	  var labelInValueShape = _propTypes2['default'].shape({
	    value: _propTypes2['default'].string.isRequired,
	    label: _propTypes2['default'].node
	  });
	  if (props.labelInValue) {
	    var validate = _propTypes2['default'].oneOfType([_propTypes2['default'].arrayOf(labelInValueShape), labelInValueShape]);
	    var error = validate.apply(undefined, arguments);
	    if (error) {
	      return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`, ' + ('when `labelInValue` is `true`, `' + propName + '` should in ') + 'shape of `{ value: string, label?: string }`.');
	    }
	  } else if (props.treeCheckable && props.treeCheckStrictly) {
	    var _validate = _propTypes2['default'].oneOfType([_propTypes2['default'].arrayOf(labelInValueShape), labelInValueShape]);
	    var _error = _validate.apply(undefined, arguments);
	    if (_error) {
	      return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`, ' + 'when `treeCheckable` and `treeCheckStrictly` are `true`, ' + ('`' + propName + '` should in shape of `{ value: string, label?: string }`.'));
	    }
	  } else if (props.multiple && props[propName] === '') {
	    return new Error('Invalid prop `' + propName + '` of type `string` supplied to `' + componentName + '`, ' + 'expected `array` when `multiple` is `true`.');
	  } else {
	    var _validate2 = _propTypes2['default'].oneOfType([_propTypes2['default'].arrayOf(_propTypes2['default'].string), _propTypes2['default'].string]);
	    return _validate2.apply(undefined, arguments);
	  }
	}