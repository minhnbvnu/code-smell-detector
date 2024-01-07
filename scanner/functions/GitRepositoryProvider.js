constructor(project, config) {
    // Keys are real paths that end in `.git`.
    // Values are the corresponding GitRepository objects.
    this.project = project;
    this.config = config;
    this.pathToRepository = {};
  }