function $HttpParamSerializerProvider() {
  /**
   * @ngdoc service
   * @name $httpParamSerializer
   * @description
   *
   * Default {@link $http `$http`} params serializer that converts objects to strings
   * according to the following rules:
   *
   * * `{'foo': 'bar'}` results in `foo=bar`
   * * `{'foo': Date.now()}` results in `foo=2015-04-01T09%3A50%3A49.262Z` (`toISOString()` and encoded representation of a Date object)
   * * `{'foo': ['bar', 'baz']}` results in `foo=bar&foo=baz` (repeated key for each array element)
   * * `{'foo': {'bar':'baz'}}` results in `foo=%7B%22bar%22%3A%22baz%22%7D"` (stringified and encoded representation of an object)
   *
   * Note that serializer will sort the request parameters alphabetically.
   * */

  this.$get = function() {
    return function ngParamSerializer(params) {
      if (!params) return '';
      var parts = [];
      forEachSorted(params, function(value, key) {
        if (value === null || isUndefined(value)) return;
        if (isArray(value)) {
          forEach(value, function(v) {
            parts.push(encodeUriQuery(key)  + '=' + encodeUriQuery(serializeValue(v)));
          });
        } else {
          parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(serializeValue(value)));
        }
      });

      return parts.join('&');
    };
  };
}