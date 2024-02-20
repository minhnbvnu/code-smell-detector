function routeHasBeenDefined(owner, name) {
  return (
    owner.hasRegistration(`template:${name}`) ||
    owner.hasRegistration(`route:${name}`)
  );
}