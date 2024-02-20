function designToken(token) {
  return (source, key) => {
    source[key + "Changed"] = function (prev, next) {
      if (next !== undefined && next !== null) {
        token.setValueFor(this, next);
      } else {
        token.deleteValueFor(this);
      }
    };
  };
}