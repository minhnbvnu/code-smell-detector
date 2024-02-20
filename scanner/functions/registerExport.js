function registerExport(exports, decl) {
    function register(name, exp) {
        if (exports.has(name))
            throw new SyntaxError("multiple exports of " + name);
        exports.set(name, exp);
    }

    switch (decl.type) {
      case MODULE:
      case FUNCTION:
        register(decl.name, new Export(decl, true));
        break;

      case VAR:
        for (var i = 0; i < decl.children.length; i++)
            register(decl.children[i].name, new Export(decl.children[i], true));
        break;

      case LET:
      case CONST:
        throw new Error("NYI: " + definitions.tokens[decl.type]);

      case EXPORT:
        for (var i = 0; i < decl.pathList.length; i++) {
            var path = decl.pathList[i];
            switch (path.type) {
              case OBJECT_INIT:
                for (var j = 0; j < path.children.length; j++) {
                    // init :: IDENTIFIER | PROPERTY_INIT
                    var init = path.children[j];
                    if (init.type === IDENTIFIER)
                        register(init.value, new Export(init, false));
                    else
                        register(init.children[0].value, new Export(init.children[1], false));
                }
                break;

              case DOT:
                register(path.children[1].value, new Export(path, false));
                break;

              case IDENTIFIER:
                register(path.value, new Export(path, false));
                break;

              default:
                throw new Error("unexpected export path: " + definitions.tokens[path.type]);
            }
        }
        break;

      default:
        throw new Error("unexpected export decl: " + definitions.tokens[exp.type]);
    }
}