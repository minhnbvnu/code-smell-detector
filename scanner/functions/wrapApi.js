function wrapApi(Vue, obj, objBase, vueComponent) {
  ['delete', 'get', 'head', 'options', 'post', 'put', 'patch'].forEach(key => {
    overrideProperty({
      Vue,
      obj,
      key,
      objBase,
      vueComponent,
      combinePath: (moduleInfo, arg) => {
        return Vue.prototype.$meta.util.combineFetchPath(moduleInfo, arg);
      },
    });
  });
}