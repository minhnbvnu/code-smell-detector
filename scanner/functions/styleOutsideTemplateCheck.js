function styleOutsideTemplateCheck(inst) {
    if (inst.querySelector('style')) {
      console.warn('dom-module %s has style outside template', inst.id);
    }
  }