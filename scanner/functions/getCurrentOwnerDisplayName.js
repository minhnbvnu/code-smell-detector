function getCurrentOwnerDisplayName() {
  var current = ReactCurrentOwner.current;
  return (
    current && getName(current) || undefined
  );
}