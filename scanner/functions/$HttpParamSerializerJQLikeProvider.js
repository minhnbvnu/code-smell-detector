function $HttpParamSerializerJQLikeProvider() {
  /**
   * @ngdoc service
   * @name $httpParamSerializerJQLike
   * @description
   *
   * Alternative {@link $http `$http`} params serializer that follows
   * jQuery's [`param()`](http://api.jquery.com/jquery.param/) method logic.
   * The serializer will also sort the params alphabetically.
   *
   * To use it for serializing `$http` request parameters, set it as the `paramSerializer` property:
   *
   * ```js
   * $http({
   *   url: myUrl,
   *   method: 'GET',
   *   params: myParams,
   *   paramSerializer: '$httpParamSerializerJQLike'
   * });
   * ```
   *
   * It is also possible to set it as the default `paramSerializer` in the
   * {@link $httpProvider#defaults `$httpProvider`}.
   *
   * Additionally, you can inject the serializer and use it explicitly, for example to serialize
   * form data for submission:
   *
   * ```js
   * .controller(function($http, $httpParamSerializerJQLike) {
   *   //...
   *
   *   $http({
   *     url: myUrl,
   *     method: 'POST',
   *     data: $httpParamSerializerJQLike(myData),
   *     headers: {
   *       'Content-Type': 'application/x-www-form-urlencoded'
   *     }
   *   });
   *
   * });
   * ```
   *
   * */
  this.$get = function() {
    return function jQueryLikeParamSerializer(params) {
      if (!params) return '';
      var parts = [];
      serialize(params, '', true);
      return parts.join('&');

      function serialize(toSerialize, prefix, topLevel) {
        if (toSerialize === null || isUndefined(toSerialize)) return;
        if (isArray(toSerialize)) {
          forEach(toSerialize, function(value, index) {
            serialize(value, prefix + '[' + (isObject(value) ? index : '') + ']');
          });
        } else if (isObject(toSerialize) && !isDate(toSerialize)) {
          forEachSorted(toSerialize, function(value, key) {
            serialize(value, prefix +
                (topLevel ? '' : '[') +
                key +
                (topLevel ? '' : ']'));
          });
        } else {
          parts.push(encodeUriQuery(prefix) + '=' + encodeUriQuery(serializeValue(toSerialize)));
        }
      }
    };
  };
}