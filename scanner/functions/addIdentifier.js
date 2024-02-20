function addIdentifier(locals, identifier, instance, name) {
      if (!(locals && isObject(locals.$scope))) {
        throw minErr('$controller')('noscp',
          "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.",
          name, identifier);
      }

      locals.$scope[identifier] = instance;
    }