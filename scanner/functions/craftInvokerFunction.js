function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
          var argCount = argTypes.length;
          if (argCount < 2) {
            throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
          }
          var isClassMethodFunc = argTypes[1] !== null && classType !== null;
          var needsDestructorStack = false;
          for (var i = 1; i < argTypes.length; ++i) {
            if (argTypes[i] !== null && argTypes[i].destructorFunction === void 0) {
              needsDestructorStack = true;
              break;
            }
          }
          var returns = argTypes[0].name !== "void";
          var argsList = "";
          var argsListWired = "";
          for (var i = 0; i < argCount - 2; ++i) {
            argsList += (i !== 0 ? ", " : "") + "arg" + i;
            argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
          }
          var invokerFnBody = "return function " + makeLegalFunctionName(humanName) + "(" + argsList + ") {\nif (arguments.length !== " + (argCount - 2) + ") {\nthrowBindingError('function " + humanName + " called with ' + arguments.length + ' arguments, expected " + (argCount - 2) + " args!');\n}\n";
          if (needsDestructorStack) {
            invokerFnBody += "var destructors = [];\n";
          }
          var dtorStack = needsDestructorStack ? "destructors" : "null";
          var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
          var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];
          if (isClassMethodFunc) {
            invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
          }
          for (var i = 0; i < argCount - 2; ++i) {
            invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
            args1.push("argType" + i);
            args2.push(argTypes[i + 2]);
          }
          if (isClassMethodFunc) {
            argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
          }
          invokerFnBody += (returns ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";
          if (needsDestructorStack) {
            invokerFnBody += "runDestructors(destructors);\n";
          } else {
            for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
              var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
              if (argTypes[i].destructorFunction !== null) {
                invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
                args1.push(paramName + "_dtor");
                args2.push(argTypes[i].destructorFunction);
              }
            }
          }
          if (returns) {
            invokerFnBody += "var ret = retType.fromWireType(rv);\nreturn ret;\n";
          }
          invokerFnBody += "}\n";
          args1.push(invokerFnBody);
          var invokerFunction = new_(Function, args1).apply(null, args2);
          return invokerFunction;
        }