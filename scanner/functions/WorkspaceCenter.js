constructor(params) {
    params.location = 'center';
    this.paneContainer = new PaneContainer(params);
    this.didActivate = params.didActivate;
    this.paneContainer.onDidActivatePane(() => this.didActivate(this));
    this.paneContainer.onDidChangeActivePane(pane => {
      params.didChangeActivePane(this, pane);
    });
    this.paneContainer.onDidChangeActivePaneItem(item => {
      params.didChangeActivePaneItem(this, item);
    });
    this.paneContainer.onDidDestroyPaneItem(item =>
      params.didDestroyPaneItem(item)
    );
  }