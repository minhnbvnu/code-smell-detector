function getCartesianProductOfValues() {
	  for (var _len = arguments.length, arrayOfValues = new Array(_len), _key4 = 0; _key4 < _len; _key4++) {
	    arrayOfValues[_key4] = arguments[_key4];
	  }

	  assert$1(arrayOfValues.length > 0, 'arrayOfValues is empty');

	  for (var _i6 = 0, _arrayOfValues = arrayOfValues; _i6 < _arrayOfValues.length; _i6++) {
	    var values = _arrayOfValues[_i6];
	    assert$1(Array.isArray(values), 'one of the values is not an array');
	    assert$1(values.length > 0, 'one of the values is empty');
	  }

	  return arrayOfValues.reduce(function (products, values) {
	    if (products.length === 0) {
	      return values.map(function (value) {
	        return [value];
	      });
	    }

	    return values.map(function (value) {
	      return products.map(function (prevValue) {
	        return [].concat(prevValue, [value]);
	      });
	    }).reduce(function (flattenedProduct, unflattenedProduct) {
	      return flattenedProduct.concat(unflattenedProduct);
	    }, []);
	  }, []);
	}