function ensureSafeMemberName(name, fullExpression) {
  if (name === "__defineGetter__" || name === "__defineSetter__"
      || name === "__lookupGetter__" || name === "__lookupSetter__"
      || name === "__proto__") {
    throw $parseMinErr('isecfld',
        'Attempting to access a disallowed field in Angular expressions! '
        + 'Expression: {0}', fullExpression);
  }
  return name;
}