function dot_(t1, t2) {
	  var $t1 = convertToTensor(t1, 't1', 'dot');
	  var $t2 = convertToTensor(t2, 't2', 'dot');
	  assert(($t1.rank === 1 || $t1.rank === 2) && ($t2.rank === 1 || $t2.rank === 2), function () {
	    return "Error in dot: inputs must all be rank 1 or 2, but got ranks " + ($t1.rank + " and " + $t2.rank + ".");
	  });
	  var t1Inner = $t1.rank === 1 ? $t1.size : $t1.shape[1];
	  var t2Inner = $t2.rank === 1 ? $t2.size : $t2.shape[0];
	  assert(t1Inner === t2Inner, function () {
	    return "Error in dot: inner dimensions of inputs must match, but got " + (t1Inner + " and " + t2Inner + ".");
	  });

	  if ($t1.rank === 1 && $t2.rank === 1) {
	    var t12D = reshape($t1, [1, -1]);
	    var t22D = reshape($t2, [-1, 1]);
	    var t1t2 = matMul(t12D, t22D);
	    return reshape(t1t2, []);
	  } else if ($t1.rank === 1 && $t2.rank === 2) {
	    var _t12D = reshape($t1, [1, -1]);

	    var _t22D = reshape($t2, [$t2.shape[0], $t2.shape[1]]);

	    var _t1t = matMul(_t12D, _t22D);

	    return reshape(_t1t, [_t1t.size]);
	  } else if ($t1.rank === 2 && $t2.rank === 1) {
	    var _t22D2 = reshape($t2, [-1, 1]);

	    var _t1t2 = matMul($t1, _t22D2);

	    return reshape(_t1t2, [_t1t2.size]);
	  } else {
	    var _t22D3 = reshape($t2, [$t2.shape[0], $t2.shape[1]]);

	    var _t1t3 = matMul($t1, _t22D3);

	    return _t1t3;
	  }
	}