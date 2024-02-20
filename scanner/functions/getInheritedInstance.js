function getInheritedInstance(class_, ptr) {
          ptr = getBasestPointer(class_, ptr);
          return registeredInstances[ptr];
        }