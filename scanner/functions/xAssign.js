function xAssign(setter, getter, data) {
  if (!isNativeEvent(data)) {
    setter(data);
    return;
  }

  var target = data.target;

  if (target.nodeName === 'INPUT') {
    if (target.type === 'radio') {
      if (target.checked) {
        setter(target.value);
      }
    } else if (target.type === 'checkbox') {
      var _data = getter();

      if (Array.isArray(_data)) {
        if (target.checked) {
          _data.push(target.value);
        } else {
          var l = _data.length;

          while (l-- >= 0) {
            if (Object(__WEBPACK_IMPORTED_MODULE_4__core_obx_utils__["q" /* looseEqual */])(_data[l], target.value)) {
              _data.splice(l, 1);
            }
          }
        }

        setter(_data);
      } else {
        setter(target.checked);
      }
    } else {
      setter(target.value);
    }
  } else if (target.nodeName === 'SELECT') {
    var _data2 = Array.prototype.filter.call(target.options, function (o) {
      return o.selected;
    }).map(function (o) {
      return o.value;
    });

    setter(target.multiple ? _data2 : _data2[0]);
  } else {
    setter(target.value);
  }
}