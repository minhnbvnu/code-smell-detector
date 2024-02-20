function loadjsx(name) {
  return require(`./pages/${name}.jsx`).default;
}