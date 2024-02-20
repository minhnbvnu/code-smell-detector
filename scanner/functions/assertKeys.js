function assertKeys (keys) {
        var obj = flag(this, 'object')
          , str
          , ok = true;

        keys = keys instanceof Array
          ? keys
          : Array.prototype.slice.call(arguments);

        if (!keys.length) throw new Error('keys required');

        var actual = Object.keys(obj)
          , len = keys.length;

        // Inclusion
        ok = keys.every(function(key){
          return ~actual.indexOf(key);
        });

        // Strict
        if (!flag(this, 'negate') && !flag(this, 'contains')) {
          ok = ok && keys.length == actual.length;
        }

        // Key string
        if (len > 1) {
          keys = keys.map(function(key){
            return _.inspect(key);
          });
          var last = keys.pop();
          str = keys.join(', ') + ', and ' + last;
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
          , 'expected #{this} to ' + str
          , 'expected #{this} to not ' + str
        );
      }