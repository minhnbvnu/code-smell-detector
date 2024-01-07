function assertProperty (name, val, msg) {
      if (msg) flag(this, 'message', msg);

      var isNested = flag(this, 'nested')
        , isOwn = flag(this, 'own')
        , flagMsg = flag(this, 'message')
        , obj = flag(this, 'object')
        , ssfi = flag(this, 'ssfi');

      if (isNested && isOwn) {
        flagMsg = flagMsg ? flagMsg + ': ' : '';
        throw new AssertionError(
          flagMsg + 'The "nested" and "own" flags cannot be combined.',
          undefined,
          ssfi
        );
      }

      if (obj === null || obj === undefined) {
        flagMsg = flagMsg ? flagMsg + ': ' : '';
        throw new AssertionError(
          flagMsg + 'Target cannot be null or undefined.',
          undefined,
          ssfi
        );
      }

      var isDeep = flag(this, 'deep')
        , negate = flag(this, 'negate')
        , pathInfo = isNested ? _.getPathInfo(obj, name) : null
        , value = isNested ? pathInfo.value : obj[name];

      var descriptor = '';
      if (isDeep) descriptor += 'deep ';
      if (isOwn) descriptor += 'own ';
      if (isNested) descriptor += 'nested ';
      descriptor += 'property ';

      var hasProperty;
      if (isOwn) hasProperty = Object.prototype.hasOwnProperty.call(obj, name);
      else if (isNested) hasProperty = pathInfo.exists;
      else hasProperty = _.hasProperty(obj, name);

      // When performing a negated assertion for both name and val, merely having
      // a property with the given name isn't enough to cause the assertion to
      // fail. It must both have a property with the given name, and the value of
      // that property must equal the given val. Therefore, skip this assertion in
      // favor of the next.
      if (!negate || arguments.length === 1) {
        this.assert(
            hasProperty
          , 'expected #{this} to have ' + descriptor + _.inspect(name)
          , 'expected #{this} to not have ' + descriptor + _.inspect(name));
      }

      if (arguments.length > 1) {
        this.assert(
            hasProperty && (isDeep ? _.eql(val, value) : val === value)
          , 'expected #{this} to have ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
          , 'expected #{this} to not have ' + descriptor + _.inspect(name) + ' of #{act}'
          , val
          , value
        );
      }

      flag(this, 'object', value);
    }