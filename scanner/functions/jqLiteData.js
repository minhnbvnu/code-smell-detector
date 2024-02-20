function jqLiteData(element, key, value) {
  if (jqLiteAcceptsData(element)) {

    var isSimpleSetter = isDefined(value);
    var isSimpleGetter = !isSimpleSetter && key && !isObject(key);
    var massGetter = !key;
    var expandoStore = jqLiteExpandoStore(element, !isSimpleGetter);
    var data = expandoStore && expandoStore.data;

    if (isSimpleSetter) { // data('key', value)
      data[key] = value;
    } else {
      if (massGetter) {  // data()
        return data;
      } else {
        if (isSimpleGetter) { // data('key')
          // don't force creation of expandoStore if it doesn't exist yet
          return data && data[key];
        } else { // mass-setter: data({key1: val1, key2: val2})
          extend(data, key);
        }
      }
    }
  }
}