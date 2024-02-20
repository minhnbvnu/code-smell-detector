function overrideProperty({ Vue, obj, key, objBase, vueComponent, combinePath }) {
  Object.defineProperty(obj, key, {
    get() {
      return function () {
        const moduleInfo = vueComponent && vueComponent.$module && vueComponent.$module.info;
        const args = new Array(arguments.length);
        args[0] = combinePath(moduleInfo, arguments[0]);
        for (let i = 1; i < args.length; i++) {
          args[i] = arguments[i];
        }
        const res = checkDebounce({ Vue, key, objBase, args });
        if (res) return res;
        return objBase[key].apply(objBase, args);
      };
    },
  });
}