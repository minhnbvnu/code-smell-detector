function addCall(scriptlet, code) {
      return "".concat(code, "\n    const updatedArgs = args ? [].concat(source).concat(args) : [source];\n    try {\n        ").concat(scriptlet.name, ".apply(this, updatedArgs);\n    } catch (e) {\n        console.log(e);\n    }");
    }