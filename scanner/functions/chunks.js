function chunks(length) {
    var arr = new Array(length);
    arr.fill('a');
    return stream.Readable.from(arr);
  }