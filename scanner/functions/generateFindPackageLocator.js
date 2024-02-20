function generateFindPackageLocator(packageInformationStores) {
  let code = ``;

  // We get the list of each string length we'll need to check in order to find the current package context
  const lengths = new Map();

  for (var _iterator7 = packageInformationStores.values(), _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
    var _ref12;

    if (_isArray7) {
      if (_i7 >= _iterator7.length) break;
      _ref12 = _iterator7[_i7++];
    } else {
      _i7 = _iterator7.next();
      if (_i7.done) break;
      _ref12 = _i7.value;
    }

    const packageInformationStore = _ref12;

    for (var _iterator9 = packageInformationStore.values(), _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
      var _ref16;

      if (_isArray9) {
        if (_i9 >= _iterator9.length) break;
        _ref16 = _iterator9[_i9++];
      } else {
        _i9 = _iterator9.next();
        if (_i9.done) break;
        _ref16 = _i9.value;
      }

      const _ref15 = _ref16;
      const packageLocation = _ref15.packageLocation;

      if (packageLocation === null) {
        continue;
      }

      const length = packageLocation.length;
      const count = (lengths.get(length) || 0) + 1;

      lengths.set(length, count);
    }
  }

  // We must try the larger lengths before the smaller ones, because smaller ones might also match the longest ones
  // (for instance, /project/path will match /project/path/.pnp/global/node_modules/pnp-cf5f9c17b8f8db)
  const sortedLengths = Array.from(lengths.entries()).sort((a, b) => {
    return b[0] - a[0];
  });

  // Generate a function that, given a file path, returns the associated package name
  code += `exports.findPackageLocator = function findPackageLocator(location) {\n`;
  code += `  let relativeLocation = normalizePath(path.relative(__dirname, location));\n`;
  code += `\n`;
  code += `  if (!relativeLocation.match(isStrictRegExp))\n`;
  code += `    relativeLocation = \`./\${relativeLocation}\`;\n`;
  code += `\n`;
  code += `  if (location.match(isDirRegExp) && relativeLocation.charAt(relativeLocation.length - 1) !== '/')\n`;
  code += `    relativeLocation = \`\${relativeLocation}/\`;\n`;
  code += `\n`;
  code += `  let match;\n`;

  for (var _iterator8 = sortedLengths, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
    var _ref14;

    if (_isArray8) {
      if (_i8 >= _iterator8.length) break;
      _ref14 = _iterator8[_i8++];
    } else {
      _i8 = _iterator8.next();
      if (_i8.done) break;
      _ref14 = _i8.value;
    }

    const _ref13 = _ref14;
    const length = _ref13[0];

    code += `\n`;
    code += `  if (relativeLocation.length >= ${length} && relativeLocation[${length - 1}] === '/')\n`;
    code += `    if (match = locatorsByLocations.get(relativeLocation.substr(0, ${length})))\n`;
    code += `      return blacklistCheck(match);\n`;
  }

  code += `\n`;
  code += `  return null;\n`;
  code += `};\n`;

  return code;
}