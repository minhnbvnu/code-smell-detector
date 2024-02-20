function nameForTemplate(template) {
    if (template.meta) {
      // Factory
      return template.meta.moduleName || null;
    } else if (template.referrer) {
      // Instance
      return template.referrer.moduleName || null;
    } else {
      return null;
    }
  }