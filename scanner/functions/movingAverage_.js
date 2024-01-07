function movingAverage_(v, x, decay, step, zeroDebias) {
	  if (zeroDebias === void 0) {
	    zeroDebias = true;
	  }

	  var $v = convertToTensor(v, 'v', 'movingAverage');
	  var $x = convertToTensor(x, 'x', 'movingAverage');
	  var $decay = convertToTensor(decay, 'decay', 'movingAverage');
	  assertTypesMatch($v, $x);
	  assert(arraysEqual($v.shape, $x.shape), function () {
	    return 'Shape mismatch in v and x';
	  });
	  var one = scalar(1);
	  var oneMinusDecay = sub(one, $decay);
	  var update = mul(sub($x, $v), oneMinusDecay);

	  if (zeroDebias) {
	    assert(step != null, function () {
	      return 'When using zeroDebias: true, step is required.';
	    });
	    var $step = convertToTensor(step, 'step', 'movingAverage');
	    update = div(update, sub(one, pow$5($decay, $step)));
	  }

	  return add$1($v, update);
	}