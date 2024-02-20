function AstInterfaceBody(name, interfacesNames, methodsNames, fields, innerClasses, misc) {
      var i, l;
      this.name = name;
      this.interfacesNames = interfacesNames;
      this.methodsNames = methodsNames;
      this.fields = fields;
      this.innerClasses = innerClasses;
      this.misc = misc;
      for (i = 0, l = fields.length; i < l; ++i) fields[i].owner = this
    }