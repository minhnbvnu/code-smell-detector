constructor(options) {
    const {
      owner, repo,
      templates
    } = options || {};

    this.templates = Object.assign({
      published: NOTIFY_PR_TEMPLATE
    }, templates);

    this.github = api || new GithubAPI(owner, repo);

    this.owner = this.github.owner;
    this.repo = this.github.repo;
  }