function tagTester(name) {
    var tag = '[object ' + name + ']';
    return function(obj) {
      return toString.call(obj) === tag;
    };
  }