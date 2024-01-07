function fetchDestination(dest) {
  return (0, _primitives.isDict)(dest) ? dest.get("D") : dest;
}