function parseOptionsExpression(optionsExp, selectElement, scope) {

    var match = optionsExp.match(NG_OPTIONS_REGEXP);
    if (!(match)) {
      throw ngOptionsMinErr('iexp',
        "Expected expression in form of " +
        "'_select_ (as _label_)? for (_key_,)?_value_ in _collection_'" +
        " but got '{0}'. Element: {1}",
        optionsExp, startingTag(selectElement));
    }

    // Extract the parts from the ngOptions expression

    // The variable name for the value of the item in the collection
    var valueName = match[5] || match[7];
    // The variable name for the key of the item in the collection
    var keyName = match[6];

    // An expression that generates the viewValue for an option if there is a label expression
    var selectAs = / as /.test(match[0]) && match[1];
    // An expression that is used to track the id of each object in the options collection
    var trackBy = match[9];
    // An expression that generates the viewValue for an option if there is no label expression
    var valueFn = $parse(match[2] ? match[1] : valueName);
    var selectAsFn = selectAs && $parse(selectAs);
    var viewValueFn = selectAsFn || valueFn;
    var trackByFn = trackBy && $parse(trackBy);

    // Get the value by which we are going to track the option
    // if we have a trackFn then use that (passing scope and locals)
    // otherwise just hash the given viewValue
    var getTrackByValueFn = trackBy ?
                              function(value, locals) { return trackByFn(scope, locals); } :
                              function getHashOfValue(value) { return hashKey(value); };
    var getTrackByValue = function(value, key) {
      return getTrackByValueFn(value, getLocals(value, key));
    };

    var displayFn = $parse(match[2] || match[1]);
    var groupByFn = $parse(match[3] || '');
    var disableWhenFn = $parse(match[4] || '');
    var valuesFn = $parse(match[8]);

    var locals = {};
    var getLocals = keyName ? function(value, key) {
      locals[keyName] = key;
      locals[valueName] = value;
      return locals;
    } : function(value) {
      locals[valueName] = value;
      return locals;
    };


    function Option(selectValue, viewValue, label, group, disabled) {
      this.selectValue = selectValue;
      this.viewValue = viewValue;
      this.label = label;
      this.group = group;
      this.disabled = disabled;
    }

    function getOptionValuesKeys(optionValues) {
      var optionValuesKeys;

      if (!keyName && isArrayLike(optionValues)) {
        optionValuesKeys = optionValues;
      } else {
        // if object, extract keys, in enumeration order, unsorted
        optionValuesKeys = [];
        for (var itemKey in optionValues) {
          if (optionValues.hasOwnProperty(itemKey) && itemKey.charAt(0) !== '$') {
            optionValuesKeys.push(itemKey);
          }
        }
      }
      return optionValuesKeys;
    }

    return {
      trackBy: trackBy,
      getTrackByValue: getTrackByValue,
      getWatchables: $parse(valuesFn, function(optionValues) {
        // Create a collection of things that we would like to watch (watchedArray)
        // so that they can all be watched using a single $watchCollection
        // that only runs the handler once if anything changes
        var watchedArray = [];
        optionValues = optionValues || [];

        var optionValuesKeys = getOptionValuesKeys(optionValues);
        var optionValuesLength = optionValuesKeys.length;
        for (var index = 0; index < optionValuesLength; index++) {
          var key = (optionValues === optionValuesKeys) ? index : optionValuesKeys[index];
          var value = optionValues[key];

          var locals = getLocals(value, key);
          var selectValue = getTrackByValueFn(value, locals);
          watchedArray.push(selectValue);

          // Only need to watch the displayFn if there is a specific label expression
          if (match[2] || match[1]) {
            var label = displayFn(scope, locals);
            watchedArray.push(label);
          }

          // Only need to watch the disableWhenFn if there is a specific disable expression
          if (match[4]) {
            var disableWhen = disableWhenFn(scope, locals);
            watchedArray.push(disableWhen);
          }
        }
        return watchedArray;
      }),

      getOptions: function() {

        var optionItems = [];
        var selectValueMap = {};

        // The option values were already computed in the `getWatchables` fn,
        // which must have been called to trigger `getOptions`
        var optionValues = valuesFn(scope) || [];
        var optionValuesKeys = getOptionValuesKeys(optionValues);
        var optionValuesLength = optionValuesKeys.length;

        for (var index = 0; index < optionValuesLength; index++) {
          var key = (optionValues === optionValuesKeys) ? index : optionValuesKeys[index];
          var value = optionValues[key];
          var locals = getLocals(value, key);
          var viewValue = viewValueFn(scope, locals);
          var selectValue = getTrackByValueFn(viewValue, locals);
          var label = displayFn(scope, locals);
          var group = groupByFn(scope, locals);
          var disabled = disableWhenFn(scope, locals);
          var optionItem = new Option(selectValue, viewValue, label, group, disabled);

          optionItems.push(optionItem);
          selectValueMap[selectValue] = optionItem;
        }

        return {
          items: optionItems,
          selectValueMap: selectValueMap,
          getOptionFromViewValue: function(value) {
            return selectValueMap[getTrackByValue(value)];
          },
          getViewValueFromOption: function(option) {
            // If the viewValue could be an object that may be mutated by the application,
            // we need to make a copy and not return the reference to the value on the option.
            return trackBy ? angular.copy(option.viewValue) : option.viewValue;
          }
        };
      }
    };
  }