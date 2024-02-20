function mixinModule(ctx) {
    if (!ctx.$module) {
      const relativeName =
        Object.getPrototypeOf(ctx.$options).__ebModuleRelativeName || ctx.$options.__ebModuleRelativeName;
      if (relativeName) {
        ctx.$module = ctx.$meta.module.get(relativeName);
      }
    }
    if (!ctx.$module && ctx.$parent) {
      ctx.$module = ctx.$parent.$module;
    }
  }