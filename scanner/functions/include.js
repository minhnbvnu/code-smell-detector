function include (val, msg) {
      if (msg) flag(this, 'message', msg);

      var obj = flag(this, 'object')
        , objType = _.type(obj).toLowerCase()
        , flagMsg = flag(this, 'message')
        , negate = flag(this, 'negate')
        , ssfi = flag(this, 'ssfi')
        , isDeep = flag(this, 'deep')
        , descriptor = isDeep ? 'deep ' : '';

      flagMsg = flagMsg ? flagMsg + ': ' : '';

      var included = false;

      switch (objType) {
        case 'string':
          included = obj.indexOf(val) !== -1;
          break;

        case 'weakset':
          if (isDeep) {
            throw new AssertionError(
              flagMsg + 'unable to use .deep.include with WeakSet',
              undefined,
              ssfi
            );
          }

          included = obj.has(val);
          break;

        case 'map':
          var isEql = isDeep ? _.eql : SameValueZero;
          obj.forEach(function (item) {
            included = included || isEql(item, val);
          });
          break;

        case 'set':
          if (isDeep) {
            obj.forEach(function (item) {
              included = included || _.eql(item, val);
            });
          } else {
            included = obj.has(val);
          }
          break;

        case 'array':
          if (isDeep) {
            included = obj.some(function (item) {
              return _.eql(item, val);
            })
          } else {
            included = obj.indexOf(val) !== -1;
          }
          break;

        default:
          // This block is for asserting a subset of properties in an object.
          // `_.expectTypes` isn't used here because `.include` should work with
          // objects with a custom `@@toStringTag`.
          if (val !== Object(val)) {
            throw new AssertionError(
              flagMsg + 'object tested must be an array, a map, an object,'
                + ' a set, a string, or a weakset, but ' + objType + ' given',
              undefined,
              ssfi
            );
          }

          var props = Object.keys(val)
            , firstErr = null
            , numErrs = 0;

          props.forEach(function (prop) {
            var propAssertion = new Assertion(obj);
            _.transferFlags(this, propAssertion, true);
            flag(propAssertion, 'lockSsfi', true);

            if (!negate || props.length === 1) {
              propAssertion.property(prop, val[prop]);
              return;
            }

            try {
              propAssertion.property(prop, val[prop]);
            } catch (err) {
              if (!_.checkError.compatibleConstructor(err, AssertionError)) {
                throw err;
              }
              if (firstErr === null) firstErr = err;
              numErrs++;
            }
          }, this);

          // When validating .not.include with multiple properties, we only want
          // to throw an assertion error if all of the properties are included,
          // in which case we throw the first property assertion error that we
          // encountered.
          if (negate && props.length > 1 && numErrs === props.length) {
            throw firstErr;
          }
          return;
      }

      // Assert inclusion in collection or substring in a string.
      this.assert(
        included
        , 'expected #{this} to ' + descriptor + 'include ' + _.inspect(val)
        , 'expected #{this} to not ' + descriptor + 'include ' + _.inspect(val));
    }