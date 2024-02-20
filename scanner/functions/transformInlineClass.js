function transformInlineClass(class_) {
      var m = (new RegExp(/\bnew\s*([A-Za-z_$][\w$]*\s*(?:\.\s*[A-Za-z_$][\w$]*)*)\s*"B\d+"\s*"A(\d+)"/)).exec(class_);
      var oldClassId = currentClassId,
        newClassId = generateClassId();
      currentClassId = newClassId;
      var uniqueClassName = m[1] + "$" + newClassId;
      var inlineClass = new AstInlineClass(uniqueClassName, transformClassBody(atoms[m[2]], uniqueClassName, "", "implements " + m[1]));
      appendClass(inlineClass, newClassId, oldClassId);
      currentClassId = oldClassId;
      return inlineClass
    }