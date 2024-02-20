function withSuffix(name, theme) {
  switch (theme) {
    case 'fill':
      return name + '-fill';
    case 'outline':
      return name + '-o';
    case 'twotone':
      return name + '-twotone';
    default:
      throw new TypeError('Unknown theme type: ' + theme + ', name: ' + name);
  }
}