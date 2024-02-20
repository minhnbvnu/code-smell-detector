function recursiveParen(begin, end) {
    var
    contains = [{begin: begin, end: end}];
    contains[0].contains = contains;
    return contains;
  }