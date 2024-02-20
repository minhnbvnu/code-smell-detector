function UNSAFE_typeMarkToMockBase(mark) {
  if (mark.$s_type === 'object') {
    var result_1 = {};
    var param_1 = mark.$s_param;
    Object.keys(param_1 || {}).forEach(function (k) {
      result_1[k] = UNSAFE_typeMarkToMockBase(param_1[k]);
    });
    return result_1;
  } else {
    return {};
  }
}