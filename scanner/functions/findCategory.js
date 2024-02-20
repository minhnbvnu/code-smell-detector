function findCategory(pages, cat) {
    var index = [];
    var ret = [];
    var indexReg = new RegExp('index$', 'i');
    Object.keys(pages).forEach(function(key) {
      var item = nico.sdk.post.read(key);
      if (item.meta.category === cat) {
        indexReg.test(item.filename) ? index.push(item) : ret.push(item);
      }
    });

    sortBy(ret, 'filename');
    //ret = ret.sort(function(a, b) {
    //  if (/index$/i.test(a.filename)) {
    //    a.meta.order = 1;
    //  }
    //  if (/index$/i.test(b.filename)) {
    //    b.meta.order = 1;
    //  }
    //  a = a.meta.order || 10;
    //  b = b.meta.order || 10;
    //  console.log(a,b,parseInt(a, 10) - parseInt(b, 10))
    //  return parseInt(a, 10) - parseInt(b, 10);
    //});
    return index.concat(ret);
  }