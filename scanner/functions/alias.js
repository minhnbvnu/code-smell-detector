function alias(type) {
  var newType = type;
  switch (type) {
    case 'cross':
      newType = 'close';
      break;
    // https://github.com/ant-design/ant-design/issues/13007

    case 'interation':
      newType = 'interaction';
      break;
    // https://github.com/ant-design/ant-design/issues/16810

    case 'canlendar':
      newType = 'calendar';
      break;
    // https://github.com/ant-design/ant-design/issues/17448

    case 'colum-height':
      newType = 'column-height';
      break;
    default:
  }
  _util_warning(newType === type, 'Icon', "Icon '".concat(type, "' was a typo and is now deprecated, please use '").concat(newType, "' instead."));
  return newType;
}