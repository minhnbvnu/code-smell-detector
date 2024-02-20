async function __prepareAtomClassBase({ atomClass, atomClassBase }) {
    if (!atomClassBase) {
      const useStoreAtomClasses = await Vue.prototype.$meta.store.use('a/basestore/atomClasses');
      atomClassBase = await useStoreAtomClasses.getAtomClassBase({ atomClass });
    }
    return atomClassBase;
  }