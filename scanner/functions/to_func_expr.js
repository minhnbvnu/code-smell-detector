function to_func_expr(defun, drop_name) {
        var ctor;
        switch (defun.CTOR) {
          case AST_AsyncDefun:
            ctor = AST_AsyncFunction;
            break;
          case AST_AsyncGeneratorDefun:
            ctor = AST_AsyncGeneratorFunction;
            break;
          case AST_Defun:
            ctor = AST_Function;
            break;
          case AST_GeneratorDefun:
            ctor = AST_GeneratorFunction;
            break;
        }
        var fn = make_node(ctor, defun, defun);
        fn.name = drop_name ? null : make_node(AST_SymbolLambda, defun.name, defun.name);
        return fn;
    }