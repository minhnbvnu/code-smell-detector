function directiveIsMultiElement(name) {
      if (hasDirectives.hasOwnProperty(name)) {
        for (var directive, directives = $injector.get(name + Suffix),
            i = 0, ii = directives.length; i < ii; i++) {
          directive = directives[i];
          if (directive.multiElement) {
            return true;
          }
        }
      }
      return false;
    }