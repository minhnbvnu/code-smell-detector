function parseAttributeList() {
    var attr = null;

    while (token === '[') {
      getToken();
      attr = {};
      while (token !== '' && token != ']') {
        if (tokenType != TOKENTYPE.IDENTIFIER) {
          throw newSyntaxError('Attribute name expected');
        }
        var name = token;

        getToken();
        if (token != '=') {
          throw newSyntaxError('Equal sign = expected');
        }
        getToken();

        if (tokenType != TOKENTYPE.IDENTIFIER) {
          throw newSyntaxError('Attribute value expected');
        }
        var value = token;
        setValue(attr, name, value); // name can be a path

        getToken();
        if (token == ',') {
          getToken();
        }
      }

      if (token != ']') {
        throw newSyntaxError('Bracket ] expected');
      }
      getToken();
    }

    return attr;
  }