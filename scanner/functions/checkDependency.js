function checkDependency(node, id) {
    const filename = context.getFilename();
    const resolvedPath = resolveFrom(path.dirname(filename), id);
    if (
      !id.startsWith('.') &&
      !id.includes('/') &&
      !ATOM_BUILTIN_PACKAGES.has(id) &&
      !pkgJson.dependencies.hasOwnProperty(id) &&
      // We rewrite imports from rxjs to be from rxjs-compat
      !(id === 'rxjs' && pkgJson.dependencies.hasOwnProperty('rxjs-compat')) &&
      !filename.includes('/spec/') &&
      !filename.includes('/scripts/') &&
      !filename.includes('.eslintrc.js') &&
      resolvedPath !== id &&
      (resolvedPath == null || !resolvedPath.startsWith(MODULES_DIR))
    ) {
      context.report({
        node,
        data: {id},
        message: '"{{id}}" must be a dependency in the root package.json',
      });
    }
  }