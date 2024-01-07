function mayHaveChildren(value) {
    return value instanceof _primitives.Ref || value instanceof _primitives.Dict || Array.isArray(value) || (0, _primitives.isStream)(value);
  }