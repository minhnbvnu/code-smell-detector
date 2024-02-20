function getAddendaForKeyUse(messageType, element, parentType) {
  var ownerName = getCurrentOwnerDisplayName();
  var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

  var useName = ownerName || parentName;
  var memoizer = ownerHasKeyUseWarning[messageType] || (ownerHasKeyUseWarning[messageType] = {});
  if (memoizer[useName]) {
    return null;
  }
  memoizer[useName] = true;

  var addenda = {
    parentOrOwner: ownerName ? ' Check the render method of ' + ownerName + '.' : parentName ? ' Check the React.render call using <' + parentName + '>.' : null,
    url: ' See https://fb.me/react-warning-keys for more information.',
    childOwner: null
  };

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    addenda.childOwner = ' It was passed a child from ' + getName(element._owner) + '.';
  }

  return addenda;
}