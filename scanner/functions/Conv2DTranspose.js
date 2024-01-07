function Conv2DTranspose(args) {
	    var _this6;

	    _this6 = _Conv2D.call(this, args) || this;
	    _this6.inputSpec = [new InputSpec({
	      ndim: 4
	    })];

	    if (_this6.padding !== 'same' && _this6.padding !== 'valid') {
	      throw new ValueError("Conv2DTranspose currently supports only padding modes 'same' " + ("and 'valid', but received padding mode " + _this6.padding));
	    }

	    return _this6;
	  }