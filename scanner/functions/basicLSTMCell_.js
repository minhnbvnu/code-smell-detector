function basicLSTMCell_(forgetBias, lstmKernel, lstmBias, data, c, h) {
	  var $forgetBias = convertToTensor(forgetBias, 'forgetBias', 'basicLSTMCell');
	  var $lstmKernel = convertToTensor(lstmKernel, 'lstmKernel', 'basicLSTMCell');
	  var $lstmBias = convertToTensor(lstmBias, 'lstmBias', 'basicLSTMCell');
	  var $data = convertToTensor(data, 'data', 'basicLSTMCell');
	  var $c = convertToTensor(c, 'c', 'basicLSTMCell');
	  var $h = convertToTensor(h, 'h', 'basicLSTMCell');
	  var combined = concat([$data, $h], 1);
	  var weighted = matMul(combined, $lstmKernel);
	  var res = add$1(weighted, $lstmBias); // i = input_gate, j = new_input, f = forget_gate, o = output_gate

	  var batchSize = res.shape[0];
	  var sliceCols = res.shape[1] / 4;
	  var sliceSize = [batchSize, sliceCols];
	  var i = slice$2(res, [0, 0], sliceSize);
	  var j = slice$2(res, [0, sliceCols], sliceSize);
	  var f = slice$2(res, [0, sliceCols * 2], sliceSize);
	  var o = slice$2(res, [0, sliceCols * 3], sliceSize);
	  var newC = add$1(mul(sigmoid(i), tanh$1(j)), mul($c, sigmoid(add$1($forgetBias, f))));
	  var newH = mul(tanh$1(newC), sigmoid(o));
	  return [newC, newH];
	}