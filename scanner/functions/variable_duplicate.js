function variable_duplicate(name) {
  return () => {
    throw new RuntimeError(`${name} is defined more than once`);
  };
}