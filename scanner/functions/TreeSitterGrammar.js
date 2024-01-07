constructor(registry, filePath, params) {
    this.registry = registry;
    this.name = params.name;
    this.scopeName = params.scopeName;

    // TODO - Remove the `RegExp` spelling and only support `Regex`, once all of the existing
    // Tree-sitter grammars are updated to spell it `Regex`.
    this.contentRegex = buildRegex(params.contentRegex || params.contentRegExp);
    this.injectionRegex = buildRegex(
      params.injectionRegex || params.injectionRegExp
    );
    this.firstLineRegex = buildRegex(params.firstLineRegex);

    this.folds = params.folds || [];
    this.folds.forEach(normalizeFoldSpecification);

    this.commentStrings = {
      commentStartString: params.comments && params.comments.start,
      commentEndString: params.comments && params.comments.end
    };

    const scopeSelectors = {};
    for (const key in params.scopes || {}) {
      const classes = preprocessScopes(params.scopes[key]);
      const selectors = key.split(/,\s+/);
      for (let selector of selectors) {
        selector = selector.trim();
        if (!selector) continue;
        if (scopeSelectors[selector]) {
          scopeSelectors[selector] = [].concat(
            scopeSelectors[selector],
            classes
          );
        } else {
          scopeSelectors[selector] = classes;
        }
      }
    }

    this.scopeMap = new SyntaxScopeMap(scopeSelectors);
    this.fileTypes = params.fileTypes || [];
    this.injectionPointsByType = {};

    for (const injectionPoint of params.injectionPoints || []) {
      this.addInjectionPoint(injectionPoint);
    }

    // TODO - When we upgrade to a new enough version of node, use `require.resolve`
    // with the new `paths` option instead of this private API.
    const languageModulePath = Module._resolveFilename(params.parser, {
      id: filePath,
      filename: filePath,
      paths: Module._nodeModulePaths(path.dirname(filePath))
    });

    this.languageModule = require(languageModulePath);
    this.classNamesById = new Map();
    this.scopeNamesById = new Map();
    this.idsByScope = Object.create(null);
    this.nextScopeId = 256 + 1;
    this.registration = null;
  }