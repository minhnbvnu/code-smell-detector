constructor(initialState) {
    this.subscriptions = new CompositeDisposable();
    this.emitter = new Emitter();

    this.state = initialState;
    this.views = {
      aboutView: null
    };

    this.subscriptions.add(
      atom.workspace.addOpener(uriToOpen => {
        if (uriToOpen === this.state.uri) {
          return this.deserialize();
        }
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', 'about:view-release-notes', () => {
        shell = shell || require('electron').shell;
        shell.openExternal(
          this.state.updateManager.getReleaseNotesURLForCurrentVersion()
        );
      })
    );
  }