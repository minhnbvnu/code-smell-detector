constructor({ menu, commands, history, config, open }) {
    this.menuManager = menu;
    this.historyManager = history;
    this.config = config;
    this.open = open;
    this.projects = [];

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      history.onDidChangeProjects(this.update.bind(this)),
      config.onDidChange(
        'core.reopenProjectMenuCount',
        ({ oldValue, newValue }) => {
          this.update();
        }
      ),
      commands.add('atom-workspace', {
        'application:reopen-project': this.reopenProjectCommand.bind(this)
      })
    );

    this.applyWindowsJumpListRemovals();
  }