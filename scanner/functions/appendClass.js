function appendClass(class_, classId, scopeId) {
      class_.classId = classId;
      class_.scopeId = scopeId;
      declaredClasses[classId] = class_
    }