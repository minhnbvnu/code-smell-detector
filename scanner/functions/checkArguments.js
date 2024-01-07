function checkArguments () {
      var obj = flag(this, 'object')
        , type = _.type(obj);
      this.assert(
          'Arguments' === type
        , 'expected #{this} to be arguments but got ' + type
        , 'expected #{this} to not be arguments'
      );
    }