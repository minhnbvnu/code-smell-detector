function propagateErrors(endEarly, errors) {
  return endEarly ? null : function (err) {
    errors.push(err);
    return err.value;
  };
}