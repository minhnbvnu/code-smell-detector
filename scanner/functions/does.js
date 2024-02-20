function does (value) {
  var arrayIndexOf = (Array.indexOf ? function (arr, obj, from) {
    return arr.indexOf(obj, from)
  } : function (arr, obj, from) {
    var l = arr.length
    var i = from ? parseInt((1 * from) + (from < 0 ? l : 0), 10) : 0
    i = i < 0 ? 0 : i
    for (; i < l; i++) if (i in arr && arr[i] === obj) return i
    return -1
  })

  return {
    startWith: function (string) {
      if (is(value).a(String)) return value.slice(0, string.length) === string
      if (is(value).a(Array)) return value[0] === string
      return false
    },

    endWith: function (string) {
      if (is(value).a(String)) return value.slice(-string.length) === string
      if (is(value).a(Array)) return value[value.length - 1] === string
      return false
    },

    contain: function (field) {
      if (is(value).a(String)) return value.indexOf(field) > -1
      if (is(value).a(Object)) return Object.prototype.hasOwnProperty.call(value, field)
      if (is(value).a(Array)) return !!~arrayIndexOf(value, field)
      return false
    }
  }
}