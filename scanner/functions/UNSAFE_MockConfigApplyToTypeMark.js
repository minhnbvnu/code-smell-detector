function UNSAFE_MockConfigApplyToTypeMark(config, mark) {
  if (mark.$s_type === 'and' || mark.$s_type === 'or') {
    return mark;
  } else if (mark.$s_type === 'object') {
    var param_2 = mark.$s_param;
    Object.keys(param_2 || {}).forEach(function (k) {
      param_2[k] = UNSAFE_MockConfigApplyToTypeMark(config[k], param_2[k]);
    });
    return mark;
  } else {
    if (Object.keys(config || {}).length > 0) {
      mark.$s_mock = config;
    }

    return mark;
  }
}