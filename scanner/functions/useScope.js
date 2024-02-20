function useScope(name) {
  const scope = useContext(ScopeContext);

  // Example
  // scope = "friends[0]"
  // name  = "friends[0]"
  // return "friends[0]"
  if (scope === name) {
    return name;
  }

  // Example
  // scope = "friends[0]"
  // name  = "name"
  // return "friends[0].name"
  if (scope && name) {
    return `${scope}.${name}`;
  }

  // Return what was passed
  if (name) {
    return name;
  }

  // If nothing passed reuturn the scope
  return scope;
}