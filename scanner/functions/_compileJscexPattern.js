function _compileJscexPattern(ast, indent) {

            var builderName = ast[2][0][2][0][1];
            var funcAst = ast[2][0][2][1];
            var binder = root.binders[builderName];

            var jscexTreeGenerator = new JscexTreeGenerator(binder);
            var jscexAst = jscexTreeGenerator.generate(funcAst);

            var codeGenerator = new CodeGenerator(builderName, binder, indent);
            var newCode = codeGenerator.generate(funcAst[2], jscexAst);

            return newCode;
        }