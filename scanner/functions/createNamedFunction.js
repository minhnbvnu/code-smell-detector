function createNamedFunction(name, body) {
          name = makeLegalFunctionName(name);
          return new Function("body", "return function " + name + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(body);
        }