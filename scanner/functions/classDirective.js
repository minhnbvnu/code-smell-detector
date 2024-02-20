function classDirective(name, selector) {
  name = 'ngClass' + name;
  return ['$animate', function($animate) {
    return {
      restrict: 'AC',
      link: function(scope, element, attr) {
        var oldVal;

        scope.$watch(attr[name], ngClassWatchAction, true);

        attr.$observe('class', function(value) {
          ngClassWatchAction(scope.$eval(attr[name]));
        });


        if (name !== 'ngClass') {
          scope.$watch('$index', function($index, old$index) {
            // jshint bitwise: false
            var mod = $index & 1;
            if (mod !== (old$index & 1)) {
              var classes = arrayClasses(scope.$eval(attr[name]));
              mod === selector ?
                addClasses(classes) :
                removeClasses(classes);
            }
          });
        }

        function addClasses(classes) {
          var newClasses = digestClassCounts(classes, 1);
          attr.$addClass(newClasses);
        }

        function removeClasses(classes) {
          var newClasses = digestClassCounts(classes, -1);
          attr.$removeClass(newClasses);
        }

        function digestClassCounts(classes, count) {
          // Use createMap() to prevent class assumptions involving property
          // names in Object.prototype
          var classCounts = element.data('$classCounts') || createMap();
          var classesToUpdate = [];
          forEach(classes, function(className) {
            if (count > 0 || classCounts[className]) {
              classCounts[className] = (classCounts[className] || 0) + count;
              if (classCounts[className] === +(count > 0)) {
                classesToUpdate.push(className);
              }
            }
          });
          element.data('$classCounts', classCounts);
          return classesToUpdate.join(' ');
        }

        function updateClasses(oldClasses, newClasses) {
          var toAdd = arrayDifference(newClasses, oldClasses);
          var toRemove = arrayDifference(oldClasses, newClasses);
          toAdd = digestClassCounts(toAdd, 1);
          toRemove = digestClassCounts(toRemove, -1);
          if (toAdd && toAdd.length) {
            $animate.addClass(element, toAdd);
          }
          if (toRemove && toRemove.length) {
            $animate.removeClass(element, toRemove);
          }
        }

        function ngClassWatchAction(newVal) {
          if (selector === true || scope.$index % 2 === selector) {
            var newClasses = arrayClasses(newVal || []);
            if (!oldVal) {
              addClasses(newClasses);
            } else if (!equals(newVal,oldVal)) {
              var oldClasses = arrayClasses(oldVal);
              updateClasses(oldClasses, newClasses);
            }
          }
          oldVal = shallowCopy(newVal);
        }
      }
    };

    function arrayDifference(tokens1, tokens2) {
      var values = [];

      outer:
      for (var i = 0; i < tokens1.length; i++) {
        var token = tokens1[i];
        for (var j = 0; j < tokens2.length; j++) {
          if (token == tokens2[j]) continue outer;
        }
        values.push(token);
      }
      return values;
    }

    function arrayClasses(classVal) {
      var classes = [];
      if (isArray(classVal)) {
        forEach(classVal, function(v) {
          classes = classes.concat(arrayClasses(v));
        });
        return classes;
      } else if (isString(classVal)) {
        return classVal.split(' ');
      } else if (isObject(classVal)) {
        forEach(classVal, function(v, k) {
          if (v) {
            classes = classes.concat(k.split(' '));
          }
        });
        return classes;
      }
      return classVal;
    }
  }];
}