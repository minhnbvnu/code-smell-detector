function generateMaps(packageInformationStores, blacklistedLocations) {
  let code = ``;

  // Bake the information stores into our generated code
  code += `let packageInformationStores = new Map([\n`;
  for (var _iterator = packageInformationStores, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref2 = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref2 = _i.value;
    }

    const _ref = _ref2;
    const packageName = _ref[0];
    const packageInformationStore = _ref[1];

    code += `  [${JSON.stringify(packageName)}, new Map([\n`;
    for (var _iterator4 = packageInformationStore, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref7;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref7 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref7 = _i4.value;
      }

      const _ref6 = _ref7;
      const packageReference = _ref6[0];
      var _ref6$ = _ref6[1];
      const packageLocation = _ref6$.packageLocation;
      const packageDependencies = _ref6$.packageDependencies;

      code += `    [${JSON.stringify(packageReference)}, {\n`;
      code += `      packageLocation: path.resolve(__dirname, ${JSON.stringify(packageLocation)}),\n`;
      code += `      packageDependencies: new Map([\n`;
      for (var _iterator5 = packageDependencies.entries(), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref9;

        if (_isArray5) {
          if (_i5 >= _iterator5.length) break;
          _ref9 = _iterator5[_i5++];
        } else {
          _i5 = _iterator5.next();
          if (_i5.done) break;
          _ref9 = _i5.value;
        }

        const _ref8 = _ref9;
        const dependencyName = _ref8[0];
        const dependencyReference = _ref8[1];

        code += `        [${JSON.stringify(dependencyName)}, ${JSON.stringify(dependencyReference)}],\n`;
      }
      code += `      ]),\n`;
      code += `    }],\n`;
    }
    code += `  ])],\n`;
  }
  code += `]);\n`;

  code += `\n`;

  // Also bake an inverse map that will allow us to find the package information based on the path
  code += `let locatorsByLocations = new Map([\n`;
  for (var _iterator2 = blacklistedLocations, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref3;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref3 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref3 = _i2.value;
    }

    const blacklistedLocation = _ref3;

    code += `  [${JSON.stringify(blacklistedLocation)}, blacklistedLocator],\n`;
  }
  for (var _iterator3 = packageInformationStores, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
    var _ref5;

    if (_isArray3) {
      if (_i3 >= _iterator3.length) break;
      _ref5 = _iterator3[_i3++];
    } else {
      _i3 = _iterator3.next();
      if (_i3.done) break;
      _ref5 = _i3.value;
    }

    const _ref4 = _ref5;
    const packageName = _ref4[0];
    const packageInformationStore = _ref4[1];

    for (var _iterator6 = packageInformationStore, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
      var _ref11;

      if (_isArray6) {
        if (_i6 >= _iterator6.length) break;
        _ref11 = _iterator6[_i6++];
      } else {
        _i6 = _iterator6.next();
        if (_i6.done) break;
        _ref11 = _i6.value;
      }

      const _ref10 = _ref11;
      const packageReference = _ref10[0];
      const packageLocation = _ref10[1].packageLocation;

      if (packageName !== null) {
        code += `  [${JSON.stringify(packageLocation)}, ${JSON.stringify({
          name: packageName,
          reference: packageReference
        })}],\n`;
      } else {
        code += `  [${JSON.stringify(packageLocation)}, topLevelLocator],\n`;
      }
    }
  }
  code += `]);\n`;

  return code;
}