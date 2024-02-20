function __prepareAtomStageString({ atomStage }) {
    const useStoreAtomStage = Vue.prototype.$meta.store.useSync('a/base/atomStage');
    return useStoreAtomStage.toString({ atomStage });
  }