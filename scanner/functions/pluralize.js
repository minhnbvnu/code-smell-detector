function pluralize(singular, count) {
      var word = (count == 1 ? singular : singular + 's');

      return '' + count + ' ' + word;
    }