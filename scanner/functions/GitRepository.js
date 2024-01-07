constructor(path, options = {}) {
    this.id = nextId++;
    this.emitter = new Emitter();
    this.subscriptions = new CompositeDisposable();
    this.repo = GitUtils.open(path);
    if (this.repo == null) {
      throw new Error(`No Git repository found searching path: ${path}`);
    }

    this.statusRefreshCount = 0;
    this.statuses = {};
    this.upstream = { ahead: 0, behind: 0 };
    for (let submodulePath in this.repo.submodules) {
      const submoduleRepo = this.repo.submodules[submodulePath];
      submoduleRepo.upstream = { ahead: 0, behind: 0 };
    }

    this.project = options.project;
    this.config = options.config;

    if (options.refreshOnWindowFocus || options.refreshOnWindowFocus == null) {
      const onWindowFocus = () => {
        this.refreshIndex();
        this.refreshStatus();
      };

      window.addEventListener('focus', onWindowFocus);
      this.subscriptions.add(
        new Disposable(() => window.removeEventListener('focus', onWindowFocus))
      );
    }

    if (this.project != null) {
      this.project
        .getBuffers()
        .forEach(buffer => this.subscribeToBuffer(buffer));
      this.subscriptions.add(
        this.project.onDidAddBuffer(buffer => this.subscribeToBuffer(buffer))
      );
    }
  }