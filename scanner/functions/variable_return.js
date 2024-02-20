function variable_return(generator) {
  return function() {
    generator.return();
  };
}