function assertKeys (keys) {
      var obj = flag(this, 'object')
        , objType = _.type(obj)
        , keysType = _.type(keys)
        , ssfi = flag(this, 'ssfi')
        , isDeep = flag(this, 'deep')
        , str
        , deepStr = ''
        , ok = true
        , flagMsg = flag(this, 'message');

      flagMsg = flagMsg ? flagMsg + ': ' : '';
      var mixedArgsMsg = flagMsg + 'when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments';

      if (objType === 'Map' || objType === 'Set') {
        deepStr = isDeep ? 'deeply ' : '';
        actual = [];

        // Map and Set '.keys' aren't supported in IE 11. Therefore, use .forEach.
        obj.forEach(function (val, key) { actual.push(key) });

        if (keysType !== 'Array') {
          keys = Array.prototype.slice.call(arguments);
        }

      } else {
        actual = _.getOwnEnumerableProperties(obj);

        switch (keysType) {
          case 'Array':
            if (arguments.length > 1) {
              throw new AssertionError(mixedArgsMsg, undefined, ssfi);
            }
            break;
          case 'Object':
            if (arguments.length > 1) {
              throw new AssertionError(mixedArgsMsg, undefined, ssfi);
            }
            keys = Object.keys(keys);
            break;
          default:
            keys = Array.prototype.slice.call(arguments);
        }

        // Only stringify non-Symbols because Symbols would become "Symbol()"
        keys = keys.map(function (val) {
          return typeof val === 'symbol' ? val : String(val);
        });
      }

      if (!keys.length) {
        throw new AssertionError(flagMsg + 'keys required', undefined, ssfi);
      }

      var len = keys.length
        , any = flag(this, 'any')
        , all = flag(this, 'all')
        , expected = keys
        , actual;

      if (!any && !all) {
        all = true;
      }

      // Has any
      if (any) {
        ok = expected.some(function(expectedKey) {
          return actual.some(function(actualKey) {
            if (isDeep) {
              return _.eql(expectedKey, actualKey);
            } else {
              return expectedKey === actualKey;
            }
          });
        });
      }

      // Has all
      if (all) {
        ok = expected.every(function(expectedKey) {
          return actual.some(function(actualKey) {
            if (isDeep) {
              return _.eql(expectedKey, actualKey);
            } else {
              return expectedKey === actualKey;
            }
          });
        });

        if (!flag(this, 'contains')) {
          ok = ok && keys.length == actual.length;
        }
      }

      // Key string
      if (len > 1) {
        keys = keys.map(function(key) {
          return _.inspect(key);
        });
        var last = keys.pop();
        if (all) {
          str = keys.join(', ') + ', and ' + last;
        }
        if (any) {
          str = keys.join(', ') + ', or ' + last;
        }
      } else {
        str = _.inspect(keys[0]);
      }

      // Form
      str = (len > 1 ? 'keys ' : 'key ') + str;

      // Have / include
      str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

      // Assertion
      this.assert(
          ok
        , 'expected #{this} to ' + deepStr + str
        , 'expected #{this} to not ' + deepStr + str
        , expected.slice(0).sort(_.compareByInspect)
        , actual.sort(_.compareByInspect)
        , true
      );
    }