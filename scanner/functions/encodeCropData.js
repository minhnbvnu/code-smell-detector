function encodeCropData(data) {
    var nums = [];

    if ($.isPlainObject(data)) {
      $.each(data, function() {
        nums.push(arguments[1]);
      });
    }

    return nums.join();
  }