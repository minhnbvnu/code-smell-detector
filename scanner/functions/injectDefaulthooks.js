function injectDefaulthooks(dataModel) {
    dataModel.install(hooks, { inject: true });
}