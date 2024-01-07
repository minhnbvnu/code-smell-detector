constructor({ project, commands, stateStore }) {
    this.stateStore = stateStore;
    this.emitter = new Emitter();
    this.projects = [];
    this.disposables = new CompositeDisposable();
    this.disposables.add(
      commands.add(
        'atom-workspace',
        { 'application:clear-project-history': this.clearProjects.bind(this) },
        false
      )
    );
    this.disposables.add(
      project.onDidChangePaths(projectPaths => this.addProject(projectPaths))
    );
  }