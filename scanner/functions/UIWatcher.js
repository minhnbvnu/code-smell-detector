constructor() {
    this.subscriptions = new CompositeDisposable();
    this.reloadAll = this.reloadAll.bind(this);
    this.watchers = [];
    this.baseTheme = this.createWatcher(new BaseThemeWatcher());
    this.watchPackages();
  }